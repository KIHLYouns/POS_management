import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../TableBases/TableHeader";
import TableTemplate from "../TableBases/TableTemplate";
import TransactionRow from "./TransactionRow";
import NewTransactionRow from "./NewTransactionRow";

import {
	fetchTransactions,
	addTransaction,
	updateTransaction,
	deleteTransaction,
} from "../../actions/transactionActions";

import { fetchInventoryItems } from "../../actions/inventoryActions";

function TransactionsTable({
	addingTransaction,
	setAddingTransaction,
	newTransactionData,
	setNewTransactionData,
}) {
	const dispatch = useDispatch();
	const { transactions = [], loading: transactionsLoading = false } =
		useSelector((state) => state.transactions || {});

	const inventoryState = useSelector(
		(state) => state.inventory || { inventory: [], loading: false }
	);

	const { inventory, loading } = inventoryState;

	useEffect(() => {
		dispatch(fetchInventoryItems());
	}, [dispatch]);

	const [expandedRows, setExpandedRows] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [editFormData, setEditFormData] = useState({
		date: "",
		totalAmount: 0,
	});

	useEffect(() => {
		dispatch(fetchTransactions());
	}, [dispatch]);

	const toggleRowExpansion = (transactionId) => {
		setExpandedRows((prevExpandedRows) =>
			prevExpandedRows.includes(transactionId)
				? prevExpandedRows.filter((id) => id !== transactionId)
				: [...prevExpandedRows, transactionId]
		);
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		dispatch(addTransaction(newTransactionData));
		setNewTransactionData({ date: "", totalAmount: 0, items: [] });
	};

	const handleUpdate = async (id) => {
		const updatedTransaction = {
			...editFormData,
			id,
		};
		dispatch(updateTransaction(id, updatedTransaction));
		setEditingId(null);
	};

	const handleDelete = (transactionId) => {
		dispatch(deleteTransaction(transactionId));
	};

	const handleEdit = (transaction) => {
		setEditingId(transaction.id);
		setEditFormData({
			date: transaction.date,
			totalAmount: transaction.totalAmount,
			items: transaction.items, // Include items in edit form data
		});
	};

	// Adjust the handleEditChange function to support editing items within a transaction
	const handleEditChange = (value, field, index) => {
		if (field === "quantity" || field === "finalPrice") {
			// Handle changes in transaction items
			const updatedItems = [...editFormData.items];
			updatedItems[index] = { ...updatedItems[index], [field]: value };
			setEditFormData({ ...editFormData, items: updatedItems });
		} else {
			// Handle changes in transaction fields other than items
			setEditFormData({ ...editFormData, [field]: value });
		}
	};

	const saveEdit = () => {
		const updatedTransaction = {
			...editFormData,
			id: editingId,
		};
		dispatch(updateTransaction(editingId, updatedTransaction));
		setEditingId(null);
	};

	const cancelEdit = () => {
		setEditingId(null);
	};
	const cancelAdd = () => {
		setAddingTransaction(false);
		setNewTransactionData({
			date: "",
			totalAmount: 0,
			items: [],
		});
	};

	const renderTransactionRow = (transaction, index) => {
		const isExpanded = expandedRows.includes(transaction.id);

		return (
			<React.Fragment key={transaction.id}>
				<TransactionRow
					transaction={transaction}
					no={index + 1}
					isExpanded={isExpanded}
					onToggleExpand={() => toggleRowExpansion(transaction.id)}
					onEdit={() => handleEdit(transaction)}
					onDelete={() => handleDelete(transaction.id)}
					isEditing={editingId === transaction.id}
					editFormData={editFormData}
					handleEditChange={handleEditChange}
					saveEdit={saveEdit}
					cancelEdit={cancelEdit}
				/>
			</React.Fragment>
		);
	};

	const renderNewTransactionTable = () => {
		return (
			addingTransaction && (
				<div className="table-container">
					<div className="table-header">
						<div className="table-title">
							<h3>New Transaction</h3>
						</div>
					</div>
					<table>
						<thead>
							<th className="No">No</th>
							<th>Date</th>
							<th>Total Amount</th>
							<th>Actions</th>
						</thead>
						<tbody>{renderNewTransactionRow()}</tbody>
					</table>
				</div>
			)
		);
	};

	const renderNewTransactionRow = () => {
		return (
			<NewTransactionRow
				newTransactionData={newTransactionData}
				setNewTransactionData={setNewTransactionData}
				addingRow={addingTransaction}
				setAddingRow={setAddingTransaction}
				handleAdd={handleAdd}
				cancelAdd={cancelAdd}
				inventory={inventory}
			/>
		);
	};

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
					addingRow={false}
					renderRow={renderTransactionRow}
					renderNewRow={renderNewTransactionRow}
				/>
			</div>
		</>
	);
}

export default TransactionsTable;
