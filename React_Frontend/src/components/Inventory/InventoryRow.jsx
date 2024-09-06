import React from "react";

const EditFields = ({
	editFormData,
	item,
	handleEditChange,
	setEditFormData,
}) => (
	<>
		<td>{item.product.name}</td>
		<td className="quantity-controls">
			<button
				className="quantity-decrement"
				type="button"
				onClick={() =>
					setEditFormData({
						...editFormData,
						stockQuantity: Math.max(
							0,
							editFormData.stockQuantity - 1
						),
					})
				}
			>
				<i className="fas fa-minus"></i>
			</button>
			<input
				className="quantity-input"
				type="number"
				value={editFormData.stockQuantity}
				onChange={(e) => handleEditChange(e, "stockQuantity")}
			/>
			<button
				className="quantity-increment"
				type="button"
				onClick={() =>
					setEditFormData({
						...editFormData,
						stockQuantity: editFormData.stockQuantity + 1,
					})
				}
			>
				<i className="fas fa-plus"></i>
			</button>
		</td>
		<td>
			<input
				className="vendor-cost-input"
				type="number"
				value={editFormData.vendorCost}
				onChange={(e) => handleEditChange(e, "vendorCost")}
			/>
		</td>
		<td>
			<input
				className="retail-price-input"
				type="number"
				value={editFormData.retailPrice}
				onChange={(e) => handleEditChange(e, "retailPrice")}
			/>
		</td>
	</>
);

const StaticFields = ({ item }) => (
	<>
		<td>{item.product.name}</td>
		<td>{item.stockQuantity}</td>
		<td>${item.vendorCost}</td>
		<td>${item.retailPrice}</td>
	</>
);

const ActionButtons = ({
	isEditing,
	saveEdit,
	cancelEdit,
	onEdit,
	onDelete,
}) => (
	<td className="action-buttons">
		{isEditing ? (
			<>
				<button onClick={saveEdit} className="save">
					<i className="fas fa-save"></i>
					<span>save</span>
				</button>
				<button onClick={cancelEdit} className="cancel">
					<i className="fas fa-times"></i>
					<span>cancel</span>
				</button>
			</>
		) : (
			<>
				<button onClick={onEdit} className="edit">
					<i className="fas fa-edit"></i>
					<span>edit</span>
				</button>
				<button onClick={onDelete} className="delete">
					<i className="fas fa-trash"></i>
					<span>delete</span>
				</button>
			</>
		)}
	</td>
);

const InventoryRow = ({
	no,
	item,
	products,
	isEditing,
	editFormData,
	setEditFormData,
	handleEditChange,
	saveEdit,
	cancelEdit,
	onDelete,
	onEdit,
}) => (
	<tr>
		<td>{no}</td>
		{isEditing ? (
			<EditFields
				item={item}
				editFormData={editFormData}
				setEditFormData={setEditFormData}
				handleEditChange={handleEditChange}
				products={products}
			/>
		) : (
			<StaticFields item={item} />
		)}
		<ActionButtons
			isEditing={isEditing}
			saveEdit={saveEdit}
			cancelEdit={cancelEdit}
			onEdit={onEdit}
			onDelete={onDelete}
		/>
	</tr>
);

export default InventoryRow;
