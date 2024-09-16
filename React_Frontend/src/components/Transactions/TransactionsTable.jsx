import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionRow from "./TransactionRow";
import NewTransactionRow from "./NewTransactionRow";
import TableHeader from "../TableBases/TableHeader";
import TableTemplate from "../TableBases/TableTemplate";
import {
	fetchTransactions,
	addTransaction,
	updateTransaction,
	deleteTransaction,
} from "../../actions/transactionActions";
import { fetchInventoryItems } from "../../actions/inventoryActions";
import jsPDF from "jspdf";

function TransactionsTable({ isAdding, setIsAdding, transactionData, setTransactionData }) {
	const dispatch = useDispatch();
	const transactions = useSelector((state) => state.transactions?.transactions || []);
	const transactionsLoading = useSelector((state) => state.transactions?.loading || false);
	const inventory = useSelector((state) => state.inventory?.inventory || []);
	const [expandedIds, setExpandedIds] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [editingData, setEditingData] = useState({
		date: "",
		totalAmount: 0,
		items: [],
	});

	useEffect(() => {
		dispatch(fetchTransactions());
	}, [dispatch]);

	const toggleExpansion = (transactionId) => {
		setExpandedIds((prev) =>
			prev.includes(transactionId) ? prev.filter((id) => id !== transactionId) : [...prev, transactionId]
		);
	};

	const handleAdd = async (e, data) => {
		e.preventDefault();
		console.log(data);
		dispatch(addTransaction(data));
		setTransactionData({ date: "", totalAmount: 0, items: [] });
		setIsAdding(false);
		dispatch(fetchInventoryItems());
	};

	const startEdit = (transaction) => {
		setEditingId(transaction.id);
		setEditingData({
			date: transaction.date,
			totalAmount: transaction.totalAmount,
			items: transaction.items,
		});
	};

	const handleEditChange = (value, field, index) => {
		setEditingData((prev) => {
			const updatedData = { ...prev };
			if (field === "quantitySold" || field === "finalUnitPrice") {
				updatedData.items = updatedData.items.map((item, itemIndex) => {
					if (itemIndex === index) {
						return { ...item, [field]: parseFloat(value) || 0 };
					}
					return item;
				});
			} else {
				updatedData[field] = value;
			}
			return updatedData;
		});
	};

	const saveEdit = () => {
		dispatch(updateTransaction(editingId, editingData));
		setEditingId(null);
		dispatch(fetchInventoryItems());
	};

	const cancelEdit = () => setEditingId(null);
	const cancelAdd = () => setIsAdding(false);

	const printReceipt = (transaction) => {
		const doc = new jsPDF({
			orientation: "p",
			unit: "mm",
			format: [80, 297],
		});

		let currentY = 10;

		doc.setFontSize(10);
		doc.setFont(undefined, "bold");
		doc.text("Order Invoice", doc.internal.pageSize.getWidth() / 2, currentY, { align: "center" });
		doc.setFontSize(8);
		doc.setFont(undefined, "normal");
		currentY += 6;

		doc.text(`Transaction ID: ${transaction.id}`, 5, currentY);
		const dateStr = `Date: ${transaction.date}`;
		doc.text(dateStr, doc.internal.pageSize.getWidth() - doc.getTextWidth(dateStr) - 5, currentY);
		currentY += 6;

		doc.setFont(undefined, "bold");
		doc.text("Item", 5, currentY);
		doc.text("Qty", 50, currentY, { align: "right" });
		doc.text("Price", 60, currentY, { align: "right" });
		doc.text("Total", 75, currentY, { align: "right" });
		doc.setFont(undefined, "normal");
		currentY += 6;

		transaction.items.forEach((item, index) => {
			if (currentY > doc.internal.pageSize.getHeight() - 6) {
				doc.addPage();
				currentY = 10;
				doc.setFontSize(10);
				doc.setFont(undefined, "bold");
				doc.text("Transaction Receipt", doc.internal.pageSize.getWidth() / 2, currentY, { align: "center" });
				doc.setFontSize(8);
				doc.setFont(undefined, "normal");
				currentY += 6;
			}
			const totalItemPrice = item.quantitySold * item.finalUnitPrice;
			doc.text(`${item.inventoryItem.product.name}`, 5, currentY);
			doc.text(`${item.quantitySold}`, 50, currentY, { align: "right" });
			doc.text(`${parseFloat(item.finalUnitPrice)}Dh`, 60, currentY, { align: "right" });
			doc.text(`${parseFloat(totalItemPrice)}Dh`, 75, currentY, { align: "right" });
			currentY += 6;
		});

		doc.setFont(undefined, "bold");
		doc.text(`Total: ${parseFloat(transaction.totalAmount)}Dh`, 75, currentY, { align: "right" });
		doc.setFont(undefined, "normal");
		currentY += 6;

		doc.setFontSize(8);
		doc.text("Thank you!", doc.internal.pageSize.getWidth() / 2, currentY, { align: "center" });

		doc.save(`receipt_${transaction.id}_${transaction.date.replace(/\//g, "-")}.pdf`);
	};

	const renderTransactionRow = (transaction, index) => (
		<TransactionRow
			key={transaction.id}
			transaction={transaction}
			no={index + 1}
			isExpanded={expandedIds.includes(transaction.id)}
			onExpandToggle={() => toggleExpansion(transaction.id)}
			onEdit={() => startEdit(transaction)}
			onDelete={() => {
				dispatch(deleteTransaction(transaction.id));
				dispatch(fetchInventoryItems());
			}}
			isEditing={editingId === transaction.id}
			editingData={editingData}
			onEditChange={handleEditChange}
			onSaveEdit={saveEdit}
			onCancelEdit={cancelEdit}
			onPrintReceipt={() => printReceipt(transaction)}
		/>
	);

	const renderNewTransactionTable = () =>
		isAdding && (
			<div className="table-container">
				<NewTransactionRow
					transactionData={transactionData}
					setTransactionData={setTransactionData}
					onAdd={handleAdd}
					onCancel={cancelAdd}
					inventory={inventory}
				/>
			</div>
		);

	return (
		<>
			{renderNewTransactionTable()}
			<div className="table-container">
				<TableHeader
					title="Transaction List"
					onRefresh={() => dispatch(fetchTransactions())}
					loading={transactionsLoading}
				/>
				<TableTemplate
					columns={[
						{ key: "no", label: "No", className: "No" },
						{ key: "date", label: "Date" },
						{ key: "totalAmount", label: "Total Amount" },
						{ key: "actions", label: "Actions" },
					]}
					data={transactions}
					renderRow={renderTransactionRow}
				/>
			</div>
		</>
	);
}

export default TransactionsTable;
