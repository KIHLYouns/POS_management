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

function TransactionsTable({
	isAdding,
	setIsAdding,
	transactionData,
	setTransactionData,
}) {
	const dispatch = useDispatch();
	const transactions = useSelector(
		(state) => state.transactions?.transactions || []
	);
	const transactionsLoading = useSelector(
		(state) => state.transactions?.loading || false
	);
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
			prev.includes(transactionId)
				? prev.filter((id) => id !== transactionId)
				: [...prev, transactionId]
		);
	};

	const handleAdd = async (e, data) => {
		e.preventDefault();
		console.log(data);
		dispatch(addTransaction(data));
		setTransactionData({ date: "", totalAmount: 0, items: [] });
		setIsAdding(false);
		dispatch(fetchInventoryItems()); // Fetch updated inventory after adding a transaction
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
		dispatch(fetchInventoryItems()); // Fetch updated inventory after updating a transaction
	};

	const cancelEdit = () => setEditingId(null);
	const cancelAdd = () => setIsAdding(false);

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
