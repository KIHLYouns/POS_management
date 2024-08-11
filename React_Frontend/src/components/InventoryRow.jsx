import React from "react";

const EditFields = ({ editFormData, handleEditChange }) => (
  <>
    <td>
      <input
        type="text"
        value={editFormData.name}
        onChange={(e) => handleEditChange(e, "name")}
      />
    </td>
    <td>
      <input
        type="number"
        value={editFormData.quantity}
        onChange={(e) => handleEditChange(e, "quantity")}
      />
    </td>
    <td>
      <input
        type="number"
        step="0.01"
        value={editFormData.vendorPrice}
        onChange={(e) => handleEditChange(e, "vendorPrice")}
      />
    </td>
    <td>
      <input
        type="number"
        step="0.01"
        value={editFormData.salePrice}
        onChange={(e) => handleEditChange(e, "salePrice")}
      />
    </td>
  </>
);

const StaticFields = ({ item }) => (
  <>
    <td>{item.product.name}</td>
    <td>{item.quantity}</td>
    <td>${item.vendorPrice.toFixed(2)}</td>
    <td>${item.salePrice.toFixed(2)}</td>
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
  isEditing,
  editFormData,
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
        editFormData={editFormData}
        handleEditChange={handleEditChange}
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