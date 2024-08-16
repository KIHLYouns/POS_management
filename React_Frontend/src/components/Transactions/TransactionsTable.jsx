import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionRow from "./TransactionRow";
import TableTemplate from "../TableBases/TableTemplate";
import TableHeader from "../TableBases/tableHeader";
import NewTransactionRow from "./NewTransactionRow";

import {
  fetchTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../actions/transactionsActions";

function TransactionsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const initialTransactionData = { type: "", amount: 0, date: "" };
  const [newTransactionData, setNewTransactionData] = useState(initialTransactionData);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState(initialTransactionData);

  // Redux hooks for state and dispatch
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.transactions);

  // Fetch transactions on component mount
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const filterTransactions = (transaction) => {
    const matchesType = transaction.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType;
  };

  const filteredTransactions = transactions.filter(filterTransactions);

  const handleAdd = async (e) => {
    e.preventDefault();
    dispatch(addTransaction(newTransactionData));
    setNewTransactionData(initialTransactionData);
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
      type: transaction.type,
      amount: transaction.amount,
      date: transaction.date,
    });
  };

  return (
    <div>
      <TableTemplate>
        <TableHeader />
        {filteredTransactions.map((transaction) => (
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            handleEdit={() => handleEdit(transaction)}
            handleDelete={() => handleDelete(transaction.id)}
          />
        ))}
        <NewTransactionRow
          newTransactionData={newTransactionData}
          setNewTransactionData={setNewTransactionData}
          handleAdd={handleAdd}
        />
      </TableTemplate>
    </div>
  );
}

export default TransactionsTable;