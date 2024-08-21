function TableTemplate({
	columns,
	data,
	addingRow,
	renderRow,
	renderNewRow,
}) {
	return (
		<table>
			<thead>
				<tr>
					{columns.map((column) => (
						<th key={column.key} className={column.className}>{column.label}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{addingRow && renderNewRow()}
				{data.map((item, index) => renderRow(item, index))}
			</tbody>
		</table>
	);
}

export default TableTemplate;
