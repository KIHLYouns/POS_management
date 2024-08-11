import React, { useState } from 'react';
import InventoryTable from './ProductsTable';

function Products() {
  const [addingProduct, setAddingProduct] = useState(false);

  const toggleAddProduct = () => {
    setAddingProduct(!addingProduct);
  };

  return (
    <div className="main-content">
      <div className="header">
        <div>
          <h2>Inventory</h2>
        </div>
        <div className="buttons">
          <button className="export"> <i className="fas fa-file-export"></i> Export</button>
          <button className="add-inventory" onClick={toggleAddProduct}> <i className="fas fa-plus"></i> Add Inventory</button>
        </div>
      </div>
      <InventoryTable addingProduct={addingProduct} setAddingProduct={setAddingProduct}/>
    </div>
  );
}

export default Products;