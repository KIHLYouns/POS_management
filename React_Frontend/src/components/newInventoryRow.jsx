import React from "react";

function NewInventoryRow({
  newItemData,
  setNewItemData,
  addingRow,
  handleAdd,
  cancelAdd,
}) {
  return (
    addingRow && (
      <tr>
        <td></td>
        <td>
          <input
            type="text"
            placeholder="Product Name"
            value={newItemData.name}
            onChange={(e) =>
              setNewItemData({
                ...newItemData,
                name: e.target.value,
              })
            }
          />
        </td>
        <td>
          <input
            type="number"
            placeholder="Quantity"
            value={newItemData.quantity}
            onChange={(e) =>
              setNewItemData({
                ...newItemData,
                quantity: e.target.value,
              })
            }
          />
        </td>
        <td>
          <input
            type="number"
            placeholder="Vendor Price"
            value={newItemData.vendorPrice}
            onChange={(e) =>
              setNewItemData({
                ...newItemData,
                vendorPrice: e.target.value,
              })
            }
          />
        </td>
        <td>
          <input
            type="number"
            placeholder="Sale Price"
            value={newItemData.salePrice}
            onChange={(e) =>
              setNewItemData({
                ...newItemData,
                salePrice: e.target.value,
              })
            }
          />
        </td>
        <td className="action-buttons">
          <button
            className="save"
            onClick={async (e) => {
              e.preventDefault();
              if (!newItemData.name.trim()) {
                alert("Please enter a product name.");
                return;
              }

              if (newItemData.quantity <= 0) {
                alert("Please enter a valid quantity.");
                return;
              }

              if (newItemData.vendorPrice <= 0 || newItemData.salePrice <= 0) {
                alert("Please enter valid prices.");
                return;
              }
              await handleAdd(e);
              cancelAdd();
            }}
          >
            <i className="fas fa-save"></i>
            <span>save</span>
          </button>

          <button className="cancel" onClick={cancelAdd}>
            <i className="fas fa-times"></i>
            <span>cancel</span>
          </button>
        </td>
      </tr>
    )
  );
}

export default NewInventoryRow;