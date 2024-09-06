import React, { useState } from "react";
import TransactionsTable from "./TransactionsTable";

function Transactions() {
	const [isAdding, setIsAdding] = useState(false);
	const initialTransactionData = {
		date: "",
		totalAmount: 0,
		items: [],
	};
	const [transactionData, setTransactionData] = useState(
		initialTransactionData
	);

	const toggleAddTransaction = () => {
		setIsAdding(!isAdding);
		setTransactionData(initialTransactionData);
	};

	return (
		<div className="main-content">
			<div className="header">
				<h2>Transactions</h2>
				<div className="buttons">
					<button className="export">
						<i className="fas fa-file-export"></i> Export
					</button>
					<button className="addNew" onClick={toggleAddTransaction}>
						<i className="fas fa-plus"></i> Add Transaction
					</button>
				</div>
			</div>
			<TransactionsTable
				isAdding={isAdding}
				setIsAdding={setIsAdding}
				transactionData={transactionData}
				setTransactionData={setTransactionData}
			/>
		</div>
	);
}

export default Transactions;
