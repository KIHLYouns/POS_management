import React from "react";

// Component for editable fields
const EditFields = ({ editFormData, handleEditChange }) => (
	<>
		<td>
			<input
				type="text"
				name="date"
				value={editFormData.date}
				onChange={(e) => handleEditChange(e.target.value, "date")}
			/>
		</td>
		<td>
			<input
				type="number"
				name="totalAmount"
				value={editFormData.totalAmount}
				onChange={(e) =>
					handleEditChange(e.target.value, "totalAmount")
				}
			/>
		</td>
	</>
);

// Component for static display fields
const StaticFields = ({ transaction }) => (
	<>
		<td>{transaction.date}</td>
		<td>${transaction.totalAmount}</td>
	</>
);

// Component for action buttons
const ActionButtons = ({
	isEditing,
	saveEdit,
	cancelEdit,
	onEdit,
	onDelete,
	onToggleExpand,
	isExpanded,
}) => (
	<td className="action-buttons">
		{isEditing ? (
			<>
				<button onClick={saveEdit} className="save">
					<i className="fas fa-save"></i>
					Save
				</button>
				<button onClick={cancelEdit} className="cancel">
					<i className="fas fa-times"></i>
					Cancel
				</button>
			</>
		) : (
			<>
				<button onClick={onToggleExpand} className="view">
					<i
						className={`fas fa-eye${isExpanded ? "-slash" : ""}`}
					></i>
					View
				</button>
				<button onClick={onEdit} className="edit">
					<i className="fas fa-edit"></i>
					Edit
				</button>
				<button onClick={onDelete} className="delete">
					<i className="fas fa-trash"></i>
					Delete
				</button>
			</>
		)}
	</td>
);

// Component for transaction items
const TransactionItems = ({
	items,
	isEditing,
	editFormData,
	setEditFormData,
	handleEditChange,
}) => (
	<tr>
		<td colSpan={4} className="expanded-row-content">
			<div className="transaction-items">
				{items.length > 0 ? (
					<table className="transaction-items-table">
						<thead>
							<tr>
								<th className="No">No</th>
								<th>Product Name</th>
								<th>Category</th>
								<th>Quantity</th>
								<th>Unit Price</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item, index) => (
								<tr key={item.id}>
									<td>{index + 1}</td>
									<td>{item.inventory.product.name}</td>
									<td>
										{item.inventory.product.category.name}
									</td>
									<td className="quantity-controls">
										{isEditing ? (
											<>
												<button
													className="quantity-decrement"
													type="button"
													onClick={() =>
														handleEditChange(
															Math.max(
																0,
																editFormData
																	.items[
																	index
																].quantity - 1
															), // Use editFormData for current state
															"quantity",
															index
														)
													}
												>
													<i className="fas fa-minus"></i>
												</button>
												<input
													className="quantity-input"
													type="number"
													value={
														editFormData.items[
															index
														].quantity
													}
													onChange={(e) =>
														handleEditChange(
															parseInt(
																e.target.value,
																10
															), // Ensure value is treated as a number
															"quantity",
															index
														)
													}
												/>
												<button
													className="quantity-increment"
													type="button"
													onClick={() =>
														handleEditChange(
															editFormData.items[
																index
															].quantity + 1, // Use editFormData for current state
															"quantity",
															index
														)
													}
												>
													<i className="fas fa-plus"></i>
												</button>
											</>
										) : (
											item.quantity
										)}
									</td>
									<td>
										{isEditing ? (
											<input
												type="number"
												value={
													editFormData.items[index]
														.finalPrice
												}
												onChange={(e) =>
													handleEditChange(
														e.target.value,
														"finalPrice",
														index
													)
												}
											/>
										) : (
											`$${item.finalPrice}`
										)}
									</td>
									<></>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No items</p>
				)}
			</div>
		</td>
	</tr>
);

// Main component for a transaction row
const TransactionRow = ({
	transaction,
	isExpanded,
	onToggleExpand,
	isEditing,
	editFormData,
	handleEditChange,
	saveEdit,
	cancelEdit,
	onDelete,
	onEdit,
}) => (
	<>
		<tr>
			<td>{transaction.id}</td>
			{isEditing ? (
				<EditFields
					editFormData={editFormData}
					handleEditChange={handleEditChange}
				/>
			) : (
				<StaticFields transaction={transaction} />
			)}
			<ActionButtons
				isEditing={isEditing}
				saveEdit={saveEdit}
				cancelEdit={cancelEdit}
				onEdit={() => onEdit(transaction.id)}
				onDelete={() => onDelete(transaction.id)}
				onToggleExpand={() => onToggleExpand(transaction.id)}
				isExpanded={isExpanded}
			/>
		</tr>
		{isExpanded && (
			<TransactionItems
				items={transaction.items}
				isEditing={isEditing}
				editFormData={editFormData}
				handleEditChange={handleEditChange}
			/>
		)}
	</>
);

export default TransactionRow;
