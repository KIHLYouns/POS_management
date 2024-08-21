import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductRow from "./ProductRow";
import TableTemplate from "../TableBases/TableTemplate";
import TableHeader from "../TableBases/TableHeader";
import NewProductRow from "./newProductRow";

import {
	fetchProducts,
	fetchCategories,
	deleteProduct,
	addProduct,
	updateProduct,
} from "../../actions/productsActions";

function ProductsTable({ addingProduct, setAddingProduct }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [categorySearchQuery, setCategorySearchQuery] = useState("");
	const initialProductData = { name: "", category: "" };
	const [newProductData, setNewProductData] = useState(initialProductData);
	const [editingId, setEditingId] = useState(null);
	const [editFormData, setEditFormData] = useState(initialProductData);


	// Redux hooks for state and dispatch
	const dispatch = useDispatch();
	const { products, categories, loading } = useSelector(
		(state) => state.products
	);

	const nameInputRef = useRef(null);
	const categoryInputRef = useRef(null);

	// Fetch products and categories on component mount
	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchCategories());
	}, [dispatch]);

	const filterProducts = (product) => {
		const matchesName = product.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory = categorySearchQuery
			? product.category.id.toString() === categorySearchQuery
			: true;
		return matchesName && matchesCategory;
	};

	const filteredProducts = products.filter(filterProducts);

	const handleAdd = async (e) => {
		e.preventDefault();
		
		dispatch(
			addProduct({
				...newProductData,
				category: { id: newProductData.category },
			})
		);
		setNewProductData({ name: "", category: "" });
	};

	const handleUpdate = async (id) => {
		const updatedProduct = {
			...editFormData,
			id,
			category: { id: editFormData.category },
		};
		dispatch(updateProduct(id, updatedProduct));
		setEditingId(null);
	};

	const handleDelete = (productId) => {
		dispatch(deleteProduct(productId));
	};

	const handleEdit = (product) => {
		setEditingId(product.id);
		setEditFormData({
			name: product.name,
			price: product.price,
			category: product.category.id,
		});
	};

	const handleEditChange = (e, field) => {
		setEditFormData({ ...editFormData, [field]: e.target.value });
	};

	const saveEdit = () => {
		handleUpdate(editingId);
	};

	const cancelAdd = () => {
		setAddingProduct(false);
		setNewProductData(initialProductData); // Reset new product form data
	};

	const renderProductRow = (item, index) => {
		return (
			<ProductRow
				no={index + 1}
				product={item.name}
				category={item.category.name}
				isEditing={editingId === item.id}
				editFormData={editFormData}
				handleEditChange={handleEditChange}
				saveEdit={saveEdit}
				cancelEdit={() => setEditingId(null)}
				onDelete={() => handleDelete(item.id)}
				onEdit={() => handleEdit(item)}
				categories={categories}
			/>
		);
	};

	const renderNewProductRow = () => {
		return (
			<NewProductRow
				categories={categories}
				newProductData={newProductData}
				setNewProductData={setNewProductData}
				addingRow={addingProduct}
				setAddingRow={setAddingProduct}
				handleAdd={handleAdd}
				cancelAdd={cancelAdd}
				nameInputRef={nameInputRef}
				categoryInputRef={categoryInputRef}
			/>
		);
	};

	return (
		<div className="table-container">
			<TableHeader
				title="Products List"
				categories={categories}
				onRefresh={() => dispatch(fetchProducts())}
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
					{ key: "product", label: "Product" },
					{ key: "category", label: "Category" },
					{ key: "actions", label: "Actions" },
				]}
				data={filteredProducts}
				addingRow={addingProduct}
				renderRow={renderProductRow}
				renderNewRow={renderNewProductRow}
			/>
		</div>
	);
}

export default ProductsTable;
