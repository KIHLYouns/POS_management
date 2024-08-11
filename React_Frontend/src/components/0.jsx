import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductRow from "./ProductRow";

import {
	fetchProducts,
	fetchCategories,
	deleteProduct,
	addProduct,
	updateProduct,
} from "../actions/productsActions";

function ProductsTable({ addingProduct, setAddingProduct }) {
	const [showFilterOptions, setShowFilterOptions] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [categorySearchQuery, setCategorySearchQuery] = useState("");
	const [sortDirection, setSortDirection] = useState("none");
	const initialProductData = { name: "", price: "", category: "" };
	const [newProductData, setNewProductData] = useState(initialProductData);
	const [editingId, setEditingId] = useState(null);
	const [editFormData, setEditFormData] = useState(initialProductData);

	// Utilizing useRef for form inputs
	const nameInputRef = useRef(null);
	const priceInputRef = useRef(null);

	// Redux hooks for state and dispatch
	const dispatch = useDispatch();
	const { products, categories, loading } = useSelector(
		(state) => state.products
	);

	// Fetch products and categories on component mount
	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchCategories());
	}, [dispatch]);

	const toggleFilterOptions = () =>
		setShowFilterOptions((prevState) => !prevState);

	const filterProducts = useCallback(
		(product) => {
			const matchesName = product.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesCategory = categorySearchQuery
				? product.category.id.toString() === categorySearchQuery
				: true;
			return matchesName && matchesCategory;
		},
		[searchQuery, categorySearchQuery]
	);

	const filteredProducts = Array.isArray(products)
		? products.filter(filterProducts)
		: [];

	const sortProducts = useCallback(
		(a, b) => {
			if (sortDirection === "asc") {
				return a.price - b.price;
			} else if (sortDirection === "desc") {
				return b.price - a.price;
			}
			return 0;
		},
		[sortDirection]
	);

	const getSortedProducts = useCallback(() => {
		return sortDirection !== "none"
			? [...filteredProducts].sort(sortProducts)
			: filteredProducts;
	}, [sortDirection, filteredProducts, sortProducts]);

	const sortedProducts = getSortedProducts();

	const handleAdd = async (e) => {
		e.preventDefault();
		if (!newProductData.name.trim()) {
			nameInputRef.current.focus();
			return;
		}
		if (!newProductData.price.trim()) {
			priceInputRef.current.focus();
			return;
		}
		// Step 2: Dispatch the addProduct action
		dispatch(
			addProduct({
				...newProductData,
				category: { id: newProductData.category },
			})
		);
		setNewProductData({ name: "", price: "", category: "" });
	};

	const handleUpdate = async (id) => {
		const updatedProduct = {
			...editFormData,
			id,
			category: { id: editFormData.category },
		};
		// Step 2: Dispatch the editProduct action
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

	const cancelEdit = () => {
		setEditingId(null);
	};

	return (
		<div className="table-container">
			<div className="table-header">
				<div className="table-title">
					<h3>Inventory List</h3>
				</div>

				<div className="filters">
					<div className="refresh-container">
						<button
							onClick={() => dispatch(fetchProducts())}
							className="button-fetch"
						>
							Refresh
							{loading && <div className="spinner"></div>}
						</button>
					</div>

					<div className="search-box-filter">
						<i className="fas fa-search"></i>
						<input
							type="text"
							placeholder="Search anything here"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<button
						className="filter-button"
						onClick={toggleFilterOptions}
					>
						<i className="fas fa-filter"></i> Filter
					</button>
					{/* Filter options */}
					{showFilterOptions && (
						<div className="filter-options">
							<select
								name="category"
								className="category-select"
								value={categorySearchQuery}
								onChange={(e) =>
									setCategorySearchQuery(e.target.value)
								}
							>
								<option value="">Select Category</option>

								{categories.map((category) => (
									<option
										key={category.id}
										value={category.id}
									>
										{category.name}
									</option>
								))}
							</select>
							<button
								className="sort-button"
								onClick={() =>
									setSortDirection(
										sortDirection === "asc" ? "desc" : "asc"
									)
								}
							>
								Price
								{sortDirection === "asc" ? (
									<i className="fas fa-sort-up"></i>
								) : (
									<i className="fas fa-sort-down"></i>
								)}
							</button>
						</div>
					)}
				</div>
			</div>
			<table>
				<thead>
					<tr>
						<th>No</th>
						<th>Product</th>
						<th>Product ID</th>
						<th>Category</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td colSpan="6">Loading...</td>
						</tr>
					) : (
						<>
							{addingProduct && (
								<tr>
									<td></td>
									<td>
										<input
											type="text"
											placeholder="Product Name"
											value={newProductData.name}
											onChange={(e) =>
												setNewProductData({
													...newProductData,
													name: e.target.value,
												})
											}
										/>
									</td>
									<td></td>{" "}
									{/* Placeholder for Product ID, which is typically auto-generated */}
									<td>
										<select
											value={newProductData.category}
											onChange={(e) =>
												setNewProductData({
													...newProductData,
													category: e.target.value,
												})
											}
										>
											<option value="">
												Select Category
											</option>
											{categories.map((category) => (
												<option
													key={category.id}
													value={category.id}
												>
													{category.name}
												</option>
											))}
										</select>
									</td>
									<td>
										<input
											type="text"
											placeholder="Price"
											value={newProductData.price}
											onChange={(e) =>
												setNewProductData({
													...newProductData,
													price: e.target.value,
												})
											}
										/>
									</td>
									<td className="action-buttons">
										<button
											className="save"
											onClick={async (e) => {
												await handleAdd(e);
												// Trigger the parent component's callback after adding the product
												if (
													typeof props.onAddProduct ===
													"function"
												) {
													props.onAddProduct(
														newProductData
													);
												}
												setAddingProduct(false); // Optionally close the add product row
											}}
										>
											<i className="fas fa-save"></i>
											<span>save</span>
										</button>

										<button
											className="cancel"
											onClick={() =>
												setAddingProduct(false)
											}
										>
											<i className="fas fa-times"></i>
											<span>cancel</span>
										</button>
									</td>
								</tr>
							)}
							{sortedProducts.length > 0 &&
								sortedProducts.map((product, index) => (
									<ProductRow
										key={product.id}
										no={index + 1}
										product={product.name}
										productId={product.id}
										category={product.category.name}
										price={product.price}
										isEditing={editingId === product.id}
										editFormData={editFormData}
										handleEditChange={(e, field) => {
											setEditFormData({
												...editFormData,
												[field]: e.target.value,
											});
										}}
										saveEdit={() =>
											handleUpdate(product.id)
										}
										cancelEdit={cancelEdit}
										onEdit={() => handleEdit(product)}
										onDelete={() =>
											handleDelete(product.id)
										}
										categories={categories}
									/>
								))}
						</>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default ProductsTable;
