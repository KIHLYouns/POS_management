import React from "react";

const TransactionItems = ({ items }) => (
    <tr>
        <td colSpan={4} className="expanded-row-content">
            <div className="transaction-items">
                {items.length > 0 ? (
                    <table className="transaction-items-table">
                        <thead>
                            <tr>
                                <th>No</th>
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
                                    <td>{item.inventory.product.category.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.finalPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No items found for this transaction.</p>
                )}
            </div>
        </td>
    </tr>
);

export default TransactionItems;