import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactSelect from "react-select";
import {
	fetchInventoryItemsByBarcode,
	fetchInventoryItems,
} from "../../actions/inventoryActions";

function NewTransactionRow({
	transactionData,
	setTransactionData,
	onAdd,
	onCancel,
}) {
	const dateInputRef = useRef(null);
	const inventory = useSelector((state) => state.inventory?.inventory || []);
	const [items, setItems] = useState(transactionData.items || []);
	const [barcodeSearch, setBarcodeSearch] = useState({});
	const [searchByBarcodeId, setSearchByBarcodeId] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchInventoryItems());
	}, [dispatch]);

	useEffect(() => {
		const currentDate = new Date();
		const formattedDate = currentDate
			.toLocaleString("fr-FR", {
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

	const handleBarcodeIDSearch = (index) => {
		const barcode = barcodeSearch[index]; // Use the barcode specific to the item index
		if (!barcode || !barcode.trim()) return; // Early return if barcode is empty

		const selectedProduct = inventory.find(
			(product) => product.barcode === barcode
		); // Search for the product in the inventory state
		if (selectedProduct) {
			const updatedItems = [...items];
			updatedItems[index] = {
				...updatedItems[index],
				inventoryItem: selectedProduct,
				finalUnitPrice: selectedProduct.retailPrice,
			};
			setItems(updatedItems); // Update the items state with the new product details
			updateTotalAmount(updatedItems); // Update the total amount
		} else {
			console.log("No product found with the given barcode.");
		}
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
											<div className="product-selection-container">
												<ReactSelect
													className="product-select"
													value={
														item.inventoryItem &&
														item.inventoryItem
															.product
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
													onChange={(
														selectedOption
													) =>
														handleProductSelect(
															index,
															selectedOption.value
														)
													}
													options={inventory.map(
														(invItem) => ({
															value: invItem.id,
															label: invItem
																.product.name,
														})
													)}
													placeholder="Select Product"
													menuPortalTarget={
														document.body
													}
													styles={{
														menuPortal: (base) => ({
															...base,
															zIndex: 9999,
														}),
													}}
												/>
												<button
													className="barcode-button"
													onClick={() => {
														setSearchByBarcodeId(
															(prev) => ({
																...prev,
																[index]:
																	!prev[
																		index
																	],
															})
														);
														setBarcodeSearch(
															(prev) => ({
																...prev,
																[index]: "",
															})
														);
													}}
												>
													<i className="fa-solid fa-barcode"></i>
												</button>
												<button className="expand-button">
													<i className="fa-solid fa-expand"></i>
												</button>
											</div>
											<div className="barcode-search-container">
												{searchByBarcodeId[index] && (
													<>
														<input
															className="barcode-search-input"
															type="text"
															placeholder="Enter barcode ID"
															value={
																barcodeSearch[
																	index
																] || ""
															}
															onChange={(e) =>
																setBarcodeSearch(
																	{
																		...barcodeSearch,
																		[index]:
																			e
																				.target
																				.value,
																	}
																)
															}
														/>
														<button
															className="search-button"
															onClick={() =>
																handleBarcodeIDSearch(
																	index
																)
															}
														>
															<i className="fa-solid fa-magnifying-glass"></i>
														</button>
													</>
												)}
											</div>
										</td>
										<td>
											<div className="quantity-controls">
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
															parseInt(
																e.target.value
															)
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
															item.quantitySold +
																1
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
											</div>
										</td>
										<td>
											<input
												type="number"
												value={item.finalUnitPrice}
												onChange={(e) =>
													handleItemChange(
														index,
														"finalUnitPrice",
														parseInt(e.target.value)
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
		</>
	);
}

export default NewTransactionRow;
