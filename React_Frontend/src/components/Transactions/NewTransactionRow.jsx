import React, { useRef, useState, useEffect } from "react";

function NewTransactionRow({
	newTransactionData,
	setNewTransactionData,
	addingRow,
	handleAdd,
	cancelAdd,
	inventory,
}) {
	const dateInputRef = useRef(null);
	const [items, setItems] = useState([]);

	const handleAddItem = () => {
		// Add a new item with placeholder values
		setItems([
			...items,
			{ productId: "", productName: "", quantity: 1, unitPrice: 0 },
		]);
	};

	const handleProductSelect = (index, selectedProductId) => {
		const selectedProduct = inventory.find(
			(product) => product.product.id === parseInt(selectedProductId)
		);
		if (selectedProduct) {
			const updatedItems = [...items];
			updatedItems[index] = {
				...updatedItems[index],
				productId: selectedProduct.product.id,
				productName: selectedProduct.product.name,
				unitPrice: selectedProduct.salePrice,
			};
			setItems(updatedItems);
			// Update total amount
			updateTotalAmount(updatedItems);
		}
	};

	const handleItemChange = (index, field, value) => {
		const updatedItems = [...items];
		if (field === "quantity") {
			// Find the inventory item to get the max available quantity
			const inventoryItem = inventory.find(
				(invItem) =>
					invItem.product.id === updatedItems[index].productId
			);
			const maxQuantity = inventoryItem ? inventoryItem.quantity : 0;
			// Ensure the new quantity does not exceed the max available quantity
			value = Math.min(value, maxQuantity);
		}
		updatedItems[index][field] = value;
		setItems(updatedItems);
		// Update total amount
		updateTotalAmount(updatedItems);
	};

	const updateTotalAmount = (updatedItems) => {
		const newTotalAmount = updatedItems.reduce(
			(total, item) =>
				total +
				(parseFloat(item.quantity) || 0) *
					(parseFloat(item.unitPrice) || 0),
			0
		);
		setNewTransactionData({
			...newTransactionData,
			totalAmount: newTotalAmount,
		});
	};

	const handleDeleteItem = (index) => {
		const updatedItems = [...items];
		updatedItems.splice(index, 1);
		setItems(updatedItems);
		// Update total amount
		updateTotalAmount(updatedItems);
	};

	useEffect(() => {
		const currentDate = new Date().toLocaleString("fr-fr", {
			weekday: "long",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
		setNewTransactionData({
			...newTransactionData,
			date: currentDate,
		});
	}, []);

	return (
		addingRow && (
			<React.Fragment>
				<tr>
					<td></td>
					<td>
						<input
							type="text"
							id="date"
							ref={dateInputRef}
							value={newTransactionData.date}
							readOnly
						/>
					</td>
					<td>
						<input
							type="number"
							id="totalAmount"
							value={newTransactionData.totalAmount}
							readOnly
						/>
						{" $"}
					</td>

					<td>
						<div className="action-buttons">
							<button onClick={handleAddItem}>
								<i className="fas fa-plus"></i>
								Add Item
							</button>
							<button
								className="save"
								onClick={async (e) => {
									e.preventDefault();
									if (!newTransactionData.date.trim()) {
										dateInputRef.current.focus();
										return;
									}
									if (
										newTransactionData.totalAmount <= 0 ||
										items.length === 0
									) {
										return;
									}
									const updatedTransactionData = {
										...newTransactionData,
										items: items,
									};
									await handleAdd(e, updatedTransactionData);
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
						</div>
					</td>
				</tr>
				<tr>
					<td colSpan={4} className="expanded-row-content">
						<div className="transaction-items">
							<table>
								<thead>
									<tr>
										<th>Product</th>
										<th>Quantity</th>
										<th>Unit Price</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{items.map((item, index) => (
										<tr key={index}>
											<td>
												<select
													value={item.productId}
													onChange={(e) =>
														handleProductSelect(
															index,
															e.target.value
														)
													}
												>
													<option value="">
														Select Product
													</option>
													{inventory.map(
														(invItem) => (
															<option
																key={
																	invItem
																		.product
																		.id
																}
																value={
																	invItem
																		.product
																		.id
																}
															>
																{
																	invItem
																		.product
																		.name
																}
															</option>
														)
													)}
												</select>
											</td>
											<td className="quantity-controls">
												<button
													className="quantity-decrement"
													type="button"
													onClick={() => {
														handleItemChange(
															index,
															"quantity",
															Math.max(
																0,
																item.quantity -
																	1
															)
														);
													}}
												>
													<i className="fas fa-minus"></i>
												</button>
												<input
													className="quantity-input"
													type="number"
													value={item.quantity}
													onChange={(e) =>
														handleItemChange(
															index,
															"quantity",
															parseInt(
																e.target.value
															)
														)
													}
													max={
														inventory.find(
															(invItem) =>
																invItem.product
																	.id ===
																item.productId
														)?.quantity || 0
													}
												/>
												<button
													className="quantity-increment"
													type="button"
													onClick={() => {
														handleItemChange(
															index,
															"quantity",
															item.quantity + 1
														);
													}}
												>
													<i className="fas fa-plus"></i>
												</button>
												{inventory.find(
													(invItem) =>
														invItem.product.id ===
														item.productId
												)?.quantity || 0}
											</td>
											<td>
												<input
													type="number"
													value={item.unitPrice}
													onChange={(e) =>
														handleItemChange(
															index,
															"unitPrice",
															e.target.value
														)
													}
												/>{" "}
												$
											</td>
											<td className="action-buttons">
												<button
													className="delete"
													onClick={() =>
														handleDeleteItem(index)
													}
												>
													<i className="fas fa-trash"></i>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</td>
				</tr>
			</React.Fragment>
		)
	);
}

export default NewTransactionRow;
