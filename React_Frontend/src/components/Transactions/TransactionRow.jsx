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

// Updated TransactionItems component to handle null inventoryItem case
const TransactionItems = ({
	items,
	isEditing,
	editFormData,
	handleEditChange,
}) => (
	<tr>
		<td colSpan={4} className="expanded-row-content">
			<div className="transaction-items">
				{items.length > 0 ? (
					<table>
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
									<td>
										{item.inventoryItem
											? item.inventoryItem.product.name
											: "Unknown Product"}
									</td>
									<td>
										{item.inventoryItem
											? item.inventoryItem.product
													.category.name
											: "Unknown Category"}
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
																].quantitySold -
																	1
															),
															"quantitySold",
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
														].quantitySold
													}
													onChange={(e) =>
														handleEditChange(
															parseInt(
																e.target.value,
																10
															),
															"quantitySold",
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
															].quantitySold + 1,
															"quantitySold",
															index
														)
													}
												>
													<i className="fas fa-plus"></i>
												</button>
											</>
										) : (
											item.quantitySold
										)}
									</td>
									<td>
										{isEditing ? (
											<input
												type="number"
												value={
													editFormData.items[index]
														.finalUnitPrice
												}
												onChange={(e) =>
													handleEditChange(
														e.target.value,
														"finalUnitPrice",
														index
													)
												}
											/>
										) : (
											`$${item.finalUnitPrice}`
										)}
									</td>
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
	no,
	isExpanded,
	onExpandToggle,
	isEditing,
	editingData,
	onEditChange,
	onSaveEdit,
	onCancelEdit,
	onDelete,
	onEdit,
}) => (
	<>
		<tr>
			<td>{no}</td>
			{isEditing ? (
				<EditFields
					editFormData={editingData}
					handleEditChange={onEditChange}
				/>
			) : (
				<StaticFields transaction={transaction} />
			)}
			<ActionButtons
				isEditing={isEditing}
				saveEdit={onSaveEdit}
				cancelEdit={onCancelEdit}
				onEdit={onEdit}
				onDelete={onDelete}
				onToggleExpand={onExpandToggle}
				isExpanded={isExpanded}
			/>
		</tr>
		{isExpanded && (
			<TransactionItems
				items={transaction.items}
				isEditing={isEditing}
				editFormData={editingData}
				handleEditChange={onEditChange}
			/>
		)}
	</>
);

export default TransactionRow;
