import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactSelect from "react-select";
import Quagga from "quagga";
import BarcodeReader from "react-barcode-reader";
import { fetchInventoryItemsByBarcode, fetchInventoryItems } from "../../actions/inventoryActions";

function NewTransactionRow({ transactionData, setTransactionData, onAdd, onCancel }) {
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
		const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}/${(currentDate.getMonth() + 1)
			.toString()
			.padStart(2, "0")}/${currentDate.getFullYear().toString().substr(-2)} ${currentDate
			.getHours()
			.toString()
			.padStart(2, "0")}:${currentDate.getMinutes().toString().padStart(2, "0")}`;

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
		const selectedProduct = inventory.find((product) => product.id === parseInt(selectedProductId));
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
			const maxQuantity = updatedItems[index].inventoryItem?.stockQuantity || 0;
			value = Math.min(parseInt(value) || 0, maxQuantity);
		}
		updatedItems[index][field] = value;
		setItems(updatedItems);
		updateTotalAmount(updatedItems);
	};

	const updateTotalAmount = (updatedItems) => {
		const newTotalAmount = updatedItems.reduce(
			(total, item) => total + (item.quantitySold || 0) * (item.finalUnitPrice || 0),
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

	const handleBarcodeIDSearch = (index, barcode) => {
		// Step 1: Check for valid input
		if (!barcode) {
			console.error("Barcode is required for searching.");
			return; // Exit the function if barcode is not provided
		}

		// Step 2 & 3: Find the product and update the item
		const selectedProduct = inventory.find((product) => product.barcode === barcode);
		if (selectedProduct) {
			const updatedItems = [...items];
			updatedItems[index] = {
				...updatedItems[index],
				inventoryItem: selectedProduct,
				finalUnitPrice: selectedProduct.retailPrice,
			};
			// Step 5: Update state
			setItems(updatedItems);
			// Step 6: Update total amount
			updateTotalAmount(updatedItems);
		} else {
			// Step 4: Handle no product found
			console.log("No product found with the given barcode.");
		}
	};

	const handleScanBarcodeClick = (index) => {
		// Check if browser supports getUserMedia
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			// Create modal for video stream
			const modal = document.createElement("div");
			modal.style.position = "fixed";
			modal.style.top = "0";
			modal.style.left = "0";
			modal.style.width = "100%";
			modal.style.height = "100%";
			modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
			modal.style.display = "flex";
			modal.style.justifyContent = "center";
			modal.style.alignItems = "center";
			modal.style.zIndex = "10000";

			// Create video element
			const video = document.createElement("video");
			video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
			video.style.maxWidth = "90%";
			video.style.maxHeight = "80%";

			// Append video to modal and modal to body
			modal.appendChild(video);
			document.body.appendChild(modal);

			// Define constraints for the video stream (use the rear camera if available)
			const constraints = { video: { facingMode: "environment" } };

			// Access the camera stream
			navigator.mediaDevices
				.getUserMedia(constraints)
				.then((stream) => {
					video.srcObject = stream;
					video.play();

					// Configure Quagga for live stream scanning
					Quagga.init(
						{
							inputStream: {
								type: "LiveStream",
								constraints: {
									facingMode: "environment",
								},
								target: video, // Pass the video element as the target for the live stream
							},
							decoder: {
								readers: ["code_128_reader"], // Specify barcode formats to decode
							},
						},
						(err) => {
							if (err) {
								console.error(err);
								alert("Error starting barcode scanner");
								modal.remove();
								return;
							}
							Quagga.start();
						}
					);

					// Handle the detected barcode
					Quagga.onDetected((result) => {
						const barcode = result.codeResult.code;
						handleBarcodeIDSearch(index, barcode);

						// Stop Quagga and the camera stream
						Quagga.stop();
						stream.getTracks().forEach((track) => track.stop());

						// Remove the modal
						modal.remove();
					});
				})
				.catch((err) => {
					console.error("Error accessing the camera", err);
					alert("Error accessing the camera");
					modal.remove();
				});

			// Close modal on click
			modal.addEventListener("click", () => {
				modal.remove();
			});
		} else {
			alert("Camera access is not supported by your browser.");
		}
	};

	return (
		<>
			<tr>
				<td>
					<input type="text" ref={dateInputRef} value={transactionData.date} readOnly />
				</td>
				<td>
					<input type="number" value={transactionData.totalAmount} readOnly /> $
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
														item.inventoryItem && item.inventoryItem.product
															? {
																	value: item.inventoryItem.id,
																	label: item.inventoryItem.product.name,
															  }
															: null
													}
													onChange={(selectedOption) =>
														handleProductSelect(index, selectedOption.value)
													}
													options={inventory.map((invItem) => ({
														value: invItem.id,
														label: invItem.product.name,
													}))}
													placeholder="Select Product"
													menuPortalTarget={document.body}
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
														setSearchByBarcodeId((prev) => ({
															...prev,
															[index]: !prev[index],
														}));
														setBarcodeSearch((prev) => ({
															...prev,
															[index]: "",
														}));
													}}
												>
													<i className="fas fa-barcode"></i>
												</button>
												<button
													className="scan-barcode-button"
													onClick={() => handleScanBarcodeClick(index)}
												>
													Scan Barcode
												</button>
											</div>
											<div className="barcode-search-container">
												{searchByBarcodeId[index] && (
													<>
														<input
															className="barcode-search-input"
															type="text"
															placeholder="Enter barcode ID"
															value={barcodeSearch[index] || ""}
															onChange={(e) =>
																setBarcodeSearch({
																	...barcodeSearch,
																	[index]: e.target.value,
																})
															}
														/>
														<button
															className="search-button"
															onClick={() => handleBarcodeIDSearch(index)}
														>
															<i className="fas fa-magnifying-glass-plus"></i>
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
															Math.max(0, item.quantitySold - 1)
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
													max={item.inventoryItem?.stockQuantity || 0}
												/>
												<button
													aria-label="Increase quantity"
													className="quantity-increment"
													type="button"
													onClick={() => {
														handleItemChange(index, "quantitySold", item.quantitySold + 1);
													}}
												>
													<i className="fas fa-plus"></i>
												</button>
												{item.inventoryItem?.stockQuantity && (
													<span> / {item.inventoryItem?.stockQuantity}</span>
												)}
											</div>
										</td>
										<td>
											<input
												type="number"
												value={item.finalUnitPrice}
												onChange={(e) =>
													handleItemChange(index, "finalUnitPrice", parseInt(e.target.value))
												}
											/>{" "}
											$
										</td>
										<td className="action-buttons">
											<button className="delete" onClick={() => handleDeleteItem(index)}>
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
