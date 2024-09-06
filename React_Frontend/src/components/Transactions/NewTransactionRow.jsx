import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";

function NewTransactionRow({
	transactionData,
	setTransactionData,
	onAdd,
	onCancel,
}) {
	const dateInputRef = useRef(null);
	const inventory = useSelector((state) => state.inventory?.inventory || []);
	const [items, setItems] = useState(transactionData.items || []);

	useEffect(() => {
		const currentDate = new Date();
		const formattedDate = currentDate
			.toLocaleString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			})
			.replace(/\//g, "-");
		setTransactionData((prevData) => ({
			...prevData,
			date: formattedDate,
		}));
	}, [setTransactionData]);

	const handleAddItem = () => {
		setItems((prevItems) => [
			...prevItems,
			{
				inventoryItem: null,
				quantitySold: 1,
				finalUnitPrice: 0,
			},
		]);
	};

	const handleProductSelect = (index, selectedProductId) => {
		const selectedProduct = inventory.find(
			(product) => product.id === parseInt(selectedProductId)
		);
		if (selectedProduct) {
			const updatedItems = [...items];
			updatedItems[index] = {
				...updatedItems[index],
				inventoryItem: selectedProduct,
				finalUnitPrice: selectedProduct.retailPrice,
			};
			setItems(updatedItems);
			updateTotalAmount(updatedItems);
		}
	};

	const handleItemChange = (index, field, value) => {
		const updatedItems = [...items];
		if (field === "quantitySold") {
			const maxQuantity =
				updatedItems[index].inventoryItem?.stockQuantity || 0;
			value = Math.min(parseInt(value) || 0, maxQuantity);
		}
		updatedItems[index][field] = value;
		setItems(updatedItems);
		updateTotalAmount(updatedItems);
	};

	const updateTotalAmount = (updatedItems) => {
		const newTotalAmount = updatedItems.reduce(
			(total, item) =>
				total + (item.quantitySold || 0) * (item.finalUnitPrice || 0),
			0
		);
		setTransactionData((prevData) => ({
			...prevData,
			totalAmount: newTotalAmount,
		}));
	};

	const handleDeleteItem = (index) => {
		const updatedItems = [...items];
		updatedItems.splice(index, 1);
		setItems(updatedItems);
		updateTotalAmount(updatedItems);
	};

	return (
		<>
			<tr>
				<td>
					<input
						type="text"
						ref={dateInputRef}
						value={transactionData.date}
						readOnly
					/>
				</td>
				<td>
					<input
						type="number"
						value={transactionData.totalAmount}
						readOnly
					/>{" "}
					$
				</td>
				<td>
					<div className="action-buttons">
						<button onClick={handleAddItem}>
							<i className="fas fa-plus"></i>
							Add Item
						</button>
						<button
							onClick={async (e) => {
								e.preventDefault();
								await onAdd(e, {
									...transactionData,
									items: items.map((item) => ({
										inventoryItemId: item.inventoryItem?.id,
										quantitySold: item.quantitySold,
										finalUnitPrice: item.finalUnitPrice,
									})),
								});
								onCancel();
							}}
						>
							<i className="fas fa-save"></i>
							Save
						</button>
						<button onClick={onCancel}>
							<i className="fas fa-times"></i>
							Cancel
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
											<ReactSelect
												value={
													item.inventoryItem
														? {
																value: item
																	.inventoryItem
																	.id,
																label: item
																	.inventoryItem
																	.product
																	.name,
														  }
														: null
												}
												onChange={(selectedOption) =>
													handleProductSelect(
														index,
														selectedOption.value
													)
												}
												options={inventory.map(
													(invItem) => ({
														value: invItem.id,
														label: invItem.product
															.name,
													})
												)}
												placeholder="Select Product"
												menuPortalTarget={document.body}
												styles={{
													menuPortal: (base) => ({
														...base,
														zIndex: 9999,
													}),
												}}
											/>
										</td>
										<td className="quantity-controls">
											<button
												aria-label="Decrease quantity"
												className="quantity-decrement"
												type="button"
												onClick={() => {
													handleItemChange(
														index,
														"quantitySold",
														Math.max(
															0,
															item.quantitySold -
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
												value={item.quantitySold}
												onChange={(e) =>
													handleItemChange(
														index,
														"quantitySold",
														parseInt(e.target.value)
													)
												}
												max={
													item.inventoryItem
														?.stockQuantity || 0
												}
											/>
											<button
												aria-label="Increase quantity"
												className="quantity-increment"
												type="button"
												onClick={() => {
													handleItemChange(
														index,
														"quantitySold",
														item.quantitySold + 1
													);
												}}
											>
												<i className="fas fa-plus"></i>
											</button>
											{item.inventoryItem
												?.stockQuantity && (
												<span>
													{" "}
													/{" "}
													{
														item.inventoryItem
															?.stockQuantity
													}
												</span>
											)}
										</td>
										<td>
											<input
												type="number"
												value={item.finalUnitPrice}
												readOnly
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
		</>
	);
}

export default NewTransactionRow;
