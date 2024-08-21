import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionsTable from "./TransactionsTable";

function Transactions() {
	const [addingTransaction, setAddingTransaction] = useState(false);
	const initialNewTransactionData = {
		date: "",
		totalAmount: 0,
		items: [],
	}
	const [newTransactionData, setNewTransactionData] = useState({initialNewTransactionData});

	const toggleAddTransaction = () => {
		setAddingTransaction(!addingTransaction);
		setNewTransactionData({initialNewTransactionData});
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
					<button
						className="addNew"
						onClick={toggleAddTransaction}
					>
						<i className="fas fa-plus"></i> Add Transaction
					</button>
				</div>
			</div>
			<TransactionsTable
				addingTransaction={addingTransaction}
				setAddingTransaction={setAddingTransaction}
				newTransactionData={newTransactionData}
				setNewTransactionData={setNewTransactionData}
			/>
		</div>
	);
}

export default Transactions;
