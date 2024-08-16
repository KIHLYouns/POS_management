import React from "react";

function NewProductRow({
	categories,
	newProductData,
	setNewProductData,
	addingRow,
	handleAdd,
	cancelAdd,
	nameInputRef,
	categoryInputRef,
}) {

	return (
		addingRow && (
			<tr>
				<td></td>
				<td>
					<input
						type="text"
						placeholder="Product Name"
						ref={nameInputRef}
						value={newProductData.name}
						onChange={(e) =>
							setNewProductData({
								...newProductData,
								name: e.target.value,
							})
						}
					/>
				</td>
				<td>
					<select
						value={newProductData.category}
						ref={categoryInputRef}
						onChange={(e) =>
							setNewProductData({
								...newProductData,
								category: e.target.value,
							})
						}
					>
						<option value="">Select Category</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</td>

				<td className="action-buttons">
					<button
						className="save"
						onClick={async (e) => {
							e.preventDefault();
							if (!newProductData.name.trim()) {
								nameInputRef.current.focus();
								return;
							}

							if (!newProductData.category) {
								categoryInputRef.current.focus();
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

export default NewProductRow;
