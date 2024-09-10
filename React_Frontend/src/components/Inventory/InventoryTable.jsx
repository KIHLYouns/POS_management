import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InventoryRow from "./InventoryRow";
import TableTemplate from "../TableBases/TableTemplate";
import TableHeader from "../TableBases/TableHeader";
import NewInventoryRow from "./newInventoryRow";
import JsBarcode from "jsbarcode";
import { v4 as uuidv4 } from "uuid";

import {
	fetchInventoryItems,
	addInventoryItem,
	updateInventoryItem,
	deleteInventoryItem,
} from "../../actions/inventoryActions";
import { fetchProducts, fetchCategories } from "../../actions/productsActions";

function InventoryTable({ addingItem, setAddingItem }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [categorySearchQuery, setCategorySearchQuery] = useState("");
	const [existingProducts, setExistingProducts] = useState([]);

	const initialItemData = {
		product: {},
		stockQuantity: 0,
		vendorCost: 0,
		retailPrice: 0,
	};
	const [newItemData, setNewItemData] = useState(initialItemData);
	const [editingId, setEditingId] = useState(null);
	const [editFormData, setEditFormData] = useState(initialItemData);

	const dispatch = useDispatch();
	const inventoryState = useSelector(
		(state) => state.inventory || { inventory: [], loading: false }
	);
	const { products, categories } = useSelector((state) => state.products);

	const { inventory, loading } = inventoryState;

	useEffect(() => {
		dispatch(fetchInventoryItems());
		dispatch(fetchProducts());
		dispatch(fetchCategories());
	}, [dispatch]);

	useEffect(() => {
		const ids = inventory.map((item) => item.product.id);
		setExistingProducts(ids);
	}, [inventory]);

	const filterItems = (item) => {
		const productName = item.product?.name?.toLowerCase() || "";

		const matchesName = searchQuery.toLowerCase()
			? productName.includes(searchQuery.toLowerCase().trim())
			: true;
		const matchesCategory = categorySearchQuery.toLowerCase()
			? item.product.category.id.toString() === categorySearchQuery
			: true;

		return matchesName && matchesCategory;
	};

	const filteredItems = inventory.filter(filterItems);

	const generateBarcode = () => {
		const uuid = uuidv4();

		const part1 = uuid.slice(0, 3);
		const part2 = uuid.slice(9, 12);
		const part3 = uuid.slice(14, 17);

		return `${part1}-${part2}-${part3}`;
	};

	const handleAdd = async (e) => {
		e.preventDefault();

		const barcode = generateBarcode();
		console.log("Generated barcode ID:", barcode);

		const newItemDataWithBarcodeId = {
			...newItemData,
			barcode,
		};

		console.log(
			"Dispatching addInventoryItem with data:",
			newItemDataWithBarcodeId
		);
		dispatch(addInventoryItem(newItemDataWithBarcodeId));
		setNewItemData(initialItemData);
	};

	const handleUpdate = async (id) => {
		const updatedItem = {
			...editFormData,
			id,
		};
		dispatch(updateInventoryItem(id, updatedItem));
		setEditingId(null);
	};

	const handleDelete = (itemId) => {
		dispatch(deleteInventoryItem(itemId));
	};

	const handleEdit = (item) => {
		setEditingId(item.id);
		setEditFormData({
			product: item.product,
			stockQuantity: item.stockQuantity,
			vendorCost: item.vendorCost,
			retailPrice: item.retailPrice,
		});
	};

	const handleEditChange = (e, field) => {
		setEditFormData({ ...editFormData, [field]: e.target.value });
	};

	const saveEdit = () => {
		handleUpdate(editingId);
	};

	const cancelAdd = () => {
		setAddingItem(false);
		setNewItemData(initialItemData);
	};

	const renderInventoryRow = (item, index) => {
		return (
			<InventoryRow
				no={index + 1}
				item={item}
				products={products}
				isEditing={editingId === item.id}
				editFormData={editFormData}
				setEditFormData={setEditFormData}
				handleEditChange={handleEditChange}
				saveEdit={saveEdit}
				cancelEdit={() => setEditingId(null)}
				onDelete={() => handleDelete(item.id)}
				onEdit={() => handleEdit(item)}
			/>
		);
	};

	const renderNewInventoryRow = () => {
		return (
			<NewInventoryRow
				newItemData={newItemData}
				setNewItemData={setNewItemData}
				addingRow={addingItem}
				setAddingRow={setAddingItem}
				products={products}
				existingProducts={existingProducts}
				handleAdd={handleAdd}
				cancelAdd={cancelAdd}
			/>
		);
	};

	return (
		<div className="table-container">
			<TableHeader
				title="Inventory List"
				onRefresh={() => dispatch(fetchInventoryItems())}
				categories={categories}
				loading={loading}
				searchQuery={searchQuery}
				onSearchChange={(e) => setSearchQuery(e.target.value)}
				categorySearchQuery={categorySearchQuery}
				onCategorySearchQuery={(e) =>
					setCategorySearchQuery(e.target.value)
				}
			/>
			<TableTemplate
				columns={[
					{ key: "no", label: "No", className: "No" },
					{ key: "name", label: "Product Name" },
					{ key: "stockQuantity", label: "Available Qty" },
					{ key: "vendorCost", label: "Vendor Cost" },
					{ key: "retailPrice", label: "Retail Price" },
					{ key: "actions", label: "Actions" },
				]}
				data={filteredItems}
				addingRow={addingItem}
				renderRow={renderInventoryRow}
				renderNewRow={renderNewInventoryRow}
			/>
		</div>
	);
}

export default InventoryTable;
