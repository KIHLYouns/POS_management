import React from "react";

const EditFields = ({ editFormData, handleEditChange, categories }) => (
	<>
		<td>
			<input
				type="text"
				value={editFormData.name}
				onChange={(e) => handleEditChange(e, "name")}
			/>
		</td>
		<td>
			<select
				value={editFormData.category}
				onChange={(e) => handleEditChange(e, "category")}
			>
				{categories.map((cat) => (
					<option key={cat.id} value={cat.id}>
						{cat.name}
					</option>
				))}
			</select>
		</td>
	</>
);

const StaticFields = ({ product, category }) => (
	<>
		<td>{product}</td>
		<td>
			<button className="btn-category">{category}</button>
		</td>
	</>
);

const ActionButtons = ({
	isEditing,
	saveEdit,
	cancelEdit,
	onEdit,
	onDelete,
}) => (
	<td className="action-buttons">
		{isEditing ? (
			<>
				<button onClick={saveEdit} className="save">
					<i className="fas fa-save"></i>
					<span>save</span>
				</button>
				<button onClick={cancelEdit} className="cancel">
					<i className="fas fa-times"></i>
					<span>cancel</span>
				</button>
			</>
		) : (
			<>
				<button className="view">
					<i className="fas fa-eye"></i>
					<span>view</span>
				</button>
				<button onClick={onEdit} className="edit">
					<i className="fas fa-edit"></i>
					<span>edit</span>
				</button>
				<button onClick={onDelete} className="delete">
					<i className="fas fa-trash"></i>
					<span>delete</span>
				</button>
			</>
		)}
	</td>
);



const ProductRow = ({
	no,
	product,
	category,
	isEditing,
	editFormData,
	handleEditChange,
	saveEdit,
	cancelEdit,
	onDelete,
	onEdit,
	categories
}) => (
	<>
		<tr>
			<td>{no}</td>
			{isEditing ? (
				<EditFields
					editFormData={editFormData}
					handleEditChange={handleEditChange}
					categories={categories}
				/>
			) : (
				<StaticFields product={product} category={category} />
			)}
			<ActionButtons
				isEditing={isEditing}
				saveEdit={saveEdit}
				cancelEdit={cancelEdit}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		</tr>
	</>
);

export default ProductRow;
