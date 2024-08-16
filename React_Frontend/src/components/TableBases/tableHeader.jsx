import React, { useState } from "react";

function TableHeader({
	title,
	onRefresh,
	loading,
	searchQuery,
	onSearchChange,
	categorySearchQuery,
	onCategorySearchQuery,
	categories,
}) {
	const [filterOptions, setfilterOptions] = useState(false);

	const toggleFilterOptions = () => setfilterOptions(!filterOptions);

	return (
		<div className="table-header">
			<div className="table-title">
				<h3>{title}</h3>
			</div>

			<div className="filters">
				<div className="refresh-container">
					<button onClick={onRefresh} className="button-fetch">
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
						onChange={onSearchChange}
					/>
				</div>
				<button className="filter-button" onClick={toggleFilterOptions}>
					<i className="fas fa-filter"></i> Filter
				</button>
				{/* Filter options */}
				{filterOptions && (
					<div className="filter-options">
						<select
							name="category"
							className="category-select"
							value={categorySearchQuery}
							onChange={onCategorySearchQuery}
						>
							<option value="">Select Category</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
		</div>
	);
}

export default TableHeader;
