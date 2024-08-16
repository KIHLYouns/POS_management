import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../actions/transactionActions"; // Adjust path as needed
import TransactionTable from "./TransactionTable";
import TableHeader from "./TableHeader"; // Assuming you have this for consistency

function Transactions() {
  const dispatch = useDispatch();
  const [addingTransaction, setAddingTransaction] = useState(false);

  // Fetch transactions on component mount
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Get transactions and loading state from Redux store
  const { transactions, loading } = useSelector((state) => state.transactions || { transactions: [], loading: false });

  const toggleAddTransaction = () => {
    setAddingTransaction(!addingTransaction);
  };

  return (
    <div className="main-content">
      <div className="header">
        <div>
          <h2>Transactions</h2>
        </div>
        <div className="buttons">
          <button className="export">
            <i className="fas fa-file-export"></i> Export
          </button>
          <button className="add-transaction" onClick={toggleAddTransaction}>
            <i className="fas fa-plus"></i> Add Transaction
          </button>
        </div>
      </div>
      <TableHeader title="Transaction List" onRefresh={() => dispatch(fetchTransactions())} loading={loading} />
      <TransactionTable
        transactions={transactions}
        addingTransaction={addingTransaction}
        setAddingTransaction={setAddingTransaction}
      />
    </div>
  );
}

export default Transactions;
