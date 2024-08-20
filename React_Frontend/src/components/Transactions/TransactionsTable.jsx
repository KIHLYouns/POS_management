import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../TableBases/TableHeader";
import TableTemplate from "../TableBases/TableTemplate";
import TransactionRow from "./TransactionRow";
import TransactionItems from "./TransactionItems";

import {
	fetchTransactions,
	addTransaction,
	updateTransaction,
	deleteTransaction,
} from "../../actions/transactionActions";

function TransactionsTable() {
	const dispatch = useDispatch();
	const { transactions = [], loading: transactionsLoading = false } =
		useSelector((state) => state.transactions || {});

	const [expandedRows, setExpandedRows] = useState([]);
	const [newTransactionData, setNewTransactionData] = useState({
		date: "",
		totalAmount: 0,
	});
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
		setNewTransactionData({ date: "", totalAmount: 0 }); // Reset to initial structure
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

	const handleEditChange = (e, field) => {
		setEditFormData({ ...editFormData, [field]: e.target.value });
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

	const renderTransactionRow = (transaction, index) => {
		const itemsForTransaction = transaction.items;

		return (
			<React.Fragment key={transaction.id}>
				<TransactionRow
					transaction={transaction}
					no={index + 1}
					isExpanded={expandedRows.includes(transaction.id)}
					onToggleExpand={() => toggleRowExpansion(transaction.id)}
					onEdit={() => handleEdit(transaction)}
					onDelete={() => handleDelete(transaction.id)}
					isEditing={editingId === transaction.id}
					editFormData={editFormData}
					handleEditChange={handleEditChange}
					saveEdit={saveEdit}
					cancelEdit={cancelEdit}
				/>
				{expandedRows.includes(transaction.id) && (
					<TransactionItems items={itemsForTransaction} />
				)}
			</React.Fragment>
		);
	};

	return (
		<div className="table-container">
			<TableHeader
				title="Transaction List"
				onRefresh={() => dispatch(fetchTransactions())}
				loading={transactionsLoading}
			/>
			<TableTemplate
				columns={[
					{ key: "id", label: "ID" },
					{ key: "date", label: "Date" },
					{ key: "totalAmount", label: "Total Amount" },
					{ key: "actions", label: "Actions" },
				]}
				data={transactions}
				renderRow={renderTransactionRow}
			/>
		</div>
	);
}

export default TransactionsTable;
