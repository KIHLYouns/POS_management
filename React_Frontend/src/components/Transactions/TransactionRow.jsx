import React from "react";

// Component for editable fields
const EditFields = ({ editFormData, handleEditChange }) => (
    <>
        <td>
            <input
                type="text"
                name="date"
                value={editFormData.date}
                onChange={(e) => handleEditChange(e, "date")}
            />
        </td>
        <td>
            <input
                type="number"
                name="totalAmount"
                value={editFormData.totalAmount}
                onChange={(e) => handleEditChange(e, "totalAmount")}
            />
        </td>
    </>
);

// Component for static display fields
const StaticFields = ({ transaction }) => (
    <>
        <td>{transaction.date}</td>
        <td>${transaction.totalAmount}</td>
    </>
);

// Component for action buttons
const ActionButtons = ({
    isEditing,
    saveEdit,
    cancelEdit,
    onEdit,
    onDelete,
    onToggleExpand,
    isExpanded,
}) => (
    <td className="action-buttons">
        {isEditing ? (
            <>
                <button onClick={saveEdit} className="save">
					<i className="fas fa-save"></i>
                    Save
                </button>
                <button onClick={cancelEdit} className="cancel">
					<i className="fas fa-times"></i>
                    Cancel
                </button>
            </>
        ) : (
            <>
                <button onClick={onToggleExpand} className="view">
                    <i
                        className={`fas fa-eye${isExpanded ? "-slash" : ""}`}
                    ></i>
                    View
                </button>
                <button onClick={onEdit} className="edit">
                    <i className="fas fa-edit"></i>
                    Edit
                </button>
                <button onClick={onDelete} className="delete">
                    <i className="fas fa-trash"></i>
                    Delete
                </button>
            </>
        )}
    </td>
);

// Main component for a transaction row
const TransactionRow = ({
    transaction,
    isExpanded,
    onToggleExpand,
    isEditing,
    editFormData,
    handleEditChange,
    saveEdit,
    cancelEdit,
    onDelete,
    onEdit,
}) => (
    <>
        <tr>
            <td>{transaction.id}</td>
            {isEditing ? (
                <EditFields
                    editFormData={editFormData}
                    handleEditChange={handleEditChange}
                />
            ) : (
                <StaticFields transaction={transaction} />
            )}
            <ActionButtons
                isEditing={isEditing}
                saveEdit={saveEdit}
                cancelEdit={cancelEdit}
                onEdit={() => onEdit(transaction.id)}
                onDelete={() => onDelete(transaction.id)}
                onToggleExpand={() => onToggleExpand(transaction.id)}
                isExpanded={isExpanded}
            />
        </tr>
    </>
);

export default TransactionRow;