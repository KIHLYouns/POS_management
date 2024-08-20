import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionsTable from "./TransactionsTable";

function Transactions() {
	const [addingTransaction, setAddingTransaction] = useState(false);

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
					<button
						className="add-transaction"
						onClick={toggleAddTransaction}
					>
						<i className="fas fa-plus"></i> Add Transaction
					</button>
				</div>
			</div>
			<TransactionsTable
				addingTransaction={addingTransaction}
				setAddingTransaction={setAddingTransaction}
			/>
		</div>
	);
}

export default Transactions;
