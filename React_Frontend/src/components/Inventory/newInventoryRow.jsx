import React from "react";

function NewInventoryRow({ newItemData, setNewItemData, addingRow, products, existingProducts, handleAdd, cancelAdd }) {
	const availableProducts = products.filter((product) => !existingProducts.includes(product.id));
	return (
		addingRow && (
			<tr>
				<td></td>
				<td>
					<select
						value={newItemData.product.id}
						onChange={(e) => {
							setNewItemData({
								...newItemData,
								product: { id: parseInt(e.target.value, 10) }, // Convert to number
							});
						}}
					>
						<option value="" disabled selected={!newItemData.product.id}>
							Select a product
						</option>
						{availableProducts && availableProducts.length > 0 ? (
							availableProducts.map((product) => (
								<option key={product.id} value={product.id}>
									{product.name}
								</option>
							))
						) : (
							<option>No products available</option>
						)}
					</select>
				</td>
				<td>
					<input
						type="number"
						placeholder="Stock Quantity"
						value={newItemData.stockQuantity}
						onChange={(e) =>
							setNewItemData({
								...newItemData,
								stockQuantity: e.target.value,
							})
						}
					/>
				</td>
				<td>
					<input
						type="number"
						placeholder="Vendor Cost"
						value={newItemData.vendorCost}
						onChange={(e) =>
							setNewItemData({
								...newItemData,
								vendorCost: e.target.value,
							})
						}
					/>
				</td>
				<td>
					<input
						type="number"
						placeholder="Retail Price"
						value={newItemData.retailPrice}
						onChange={(e) =>
							setNewItemData({
								...newItemData,
								retailPrice: e.target.value,
							})
						}
					/>
				</td>
				<td className="action-buttons">
					<button
						className="save"
						onClick={async (e) => {
							e.preventDefault();
							if (!newItemData.product.id) {
								alert("Please choose a product.");
								return;
							}

							if (newItemData.stockQuantity <= 0) {
								alert("Please enter a valid stock quantity.");
								return;
							}

							if (newItemData.vendorCost <= 0 || newItemData.retailPrice <= 0) {
								alert("Please enter valid costs.");
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
