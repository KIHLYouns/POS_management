import React from "react";

const EditFields = ({
	editFormData,
	item,
	handleEditChange,
	setEditFormData,
  }) => (
	<>
	  <td className="product-name">{item.product.name}</td>
	  <td className="quantity-cell">
		<div className="quantity-input">
		  <button
			type="button"
			className="quantity-btn minus"
			onClick={() =>
			  setEditFormData({
				...editFormData,
				quantity: Math.max(0, editFormData.quantity - 1), // Prevent negative values
			  })
			}
		  >
			<i className="fas fa-minus"></i>
		  </button>
		  <input
			type="number"
			className="qty-field"
			value={editFormData.quantity}
			onChange={(e) => handleEditChange(e, "quantity")}
			min="0" // Enforce non-negative values
		  />
		  <button
			type="button"
			className="quantity-btn plus"
			onClick={() =>
			  setEditFormData({
				...editFormData,
				quantity: editFormData.quantity + 1,
			  })
			}
		  >
			<i className="fas fa-plus"></i>
		  </button>
		</div>
	  </td>
	  <td>
		<input
		  type="number"
		  className="price-input"
		  value={editFormData.vendorPrice}
		  onChange={(e) => handleEditChange(e, "vendorPrice")}
		  min="0" // Enforce non-negative values
		/>
	  </td>
	  <td>
		<input
		  type="number"
		  value={editFormData.salePrice}
		  onChange={(e) => handleEditChange(e, "salePrice")}
		  min="0" // Enforce non-negative values
		/>
	  </td>
	</>
  );

const StaticFields = ({ item }) => (
	<>
		<td>{item.product.name}</td>
		<td>{item.quantity}</td>
		<td>${item.vendorPrice}</td>
		<td>${item.salePrice}</td>
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
