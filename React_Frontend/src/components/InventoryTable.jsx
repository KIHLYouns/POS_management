import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InventoryRow from "./InventoryRow";
import TableTemplate from "./TableTemplate";
import TableHeader from "./tableHeader";
import NewInventoryRow from "./newInventoryRow";

import {
	fetchInventoryItems,
	addInventoryItem,
	updateInventoryItem,
	deleteInventoryItem,
} from "../actions/inventoryActions";

function InventoryTable({ addingItem, setAddingItem }) {
	const [searchQuery, setSearchQuery] = useState("");
	const initialItemData = {
		product: {
			name: "",
			category: {
				name: "",
			},
		},
		quantity: 0,
		vendorPrice: 0,
		salePrice: 0,
	};
	const [newItemData, setNewItemData] = useState(initialItemData);
	const [editingId, setEditingId] = useState(null);
	const [editFormData, setEditFormData] = useState(initialItemData);

	// Redux hooks for state and dispatch
	const dispatch = useDispatch();
	const inventoryState = useSelector(
		(state) => state.inventory || { inventory: [], loading: false }
	);
	const { inventory, loading } = inventoryState;

	useEffect(() => {
		dispatch(fetchInventoryItems());
	}, [dispatch]);

	const filterItems = (item) => {
		return (
			item.product &&
			item.product.name &&
			typeof item.product.name === "string" &&
			item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};

	const filteredItems = inventory.filter(filterItems);

	const handleAdd = async (e) => {
		e.preventDefault();
		// Adjust newItemData structure if necessary before dispatching
		dispatch(addInventoryItem(newItemData));
		setNewItemData(initialItemData);
	};

	const handleUpdate = async (id) => {
		const updatedItem = {
			...editFormData,
			id,
		};
		// Adjust updatedItem structure if necessary before dispatching
		dispatch(updateInventoryItem(id, updatedItem));
		setEditingId(null);
	};

	const handleDelete = (itemId) => {
		dispatch(deleteInventoryItem(itemId));
	};

	const handleEdit = (item) => {
		setEditingId(item.id);
		setEditFormData({
			product: {
				name: item.product.name,
				category: {
					name: item.product.category.name,
				},
			},
			quantity: item.quantity,
			vendorPrice: item.vendorPrice,
			salePrice: item.salePrice,
		});
	};

	const handleEditChange = (e, field) => {
		// Ensure nested structure is maintained for product and category fields
		if (field.includes(".")) {
			const [parent, child] = field.split(".");
			setEditFormData({
				...editFormData,
				[parent]: {
					...editFormData[parent],
					[child]: e.target.value,
				},
			});
		} else {
			setEditFormData({ ...editFormData, [field]: e.target.value });
		}
	};

	const saveEdit = () => {
		handleUpdate(editingId);
	};

	const cancelAdd = () => {
		setAddingItem(false);
		setNewItemData(initialItemData); // Reset new item form data
	};

	const renderInventoryRow = (item, index) => {
		return (
			<InventoryRow
				no={index + 1}
				item={item}
        productName={item.product.name} // Explicitly pass the product name
				isEditing={editingId === item.id}
				editFormData={editFormData}
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
				handleAdd={handleAdd}
				cancelAdd={cancelAdd}
			/>
		);
	};

	return (
		<div className="table-container">
			<TableHeader
				title="Inventory"
				onRefresh={() => dispatch(fetchInventoryItems())}
				loading={loading}
				searchQuery={searchQuery}
				onSearchChange={(e) => setSearchQuery(e.target.value)}
			/>
			<TableTemplate
				columns={[
					{ key: "no", label: "No" },
					{ key: "name", label: "Product" },
					{ key: "quantity", label: "Quantity" },
					{ key: "vendorPrice", label: "Vendor Price" },
					{ key: "salePrice", label: "Sale Price" },
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
