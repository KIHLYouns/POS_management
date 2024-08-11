import React, { useState } from 'react';
import InventoryTable from './InventoryTable';

function Inventory() {
  const [addingItem, setAddingItem] = useState(false);

  const toggleAddItem = () => {
    setAddingItem(!addingItem);
  };

  return (
    <div className="main-content">
      <div className="header">
        <div>
          <h2>Inventory Management</h2>
        </div>
        <div className="buttons">
          <button className="export"> <i className="fas fa-file-export"></i> Export</button>
          <button className="add-inventory" onClick={toggleAddItem}> <i className="fas fa-plus"></i> Add Item</button>
        </div>
      </div>
      <InventoryTable addingItem={addingItem} setAddingItem={setAddingItem}/>
    </div>
  );
}

export default Inventory;