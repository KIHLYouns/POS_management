import React from "react";
import { NavLink } from 'react-router-dom';
import DarkModeToggle from "./DarkModeToggle";

function Sidebar() {
    return (
        <div className="sidebar">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : undefined}>
                <i className="fas fa-chart-line "></i> Dashboard
            </NavLink>
            <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : undefined}>
                <i className="fas fa-clipboard-list"></i> Orders
            </NavLink>
            <NavLink to="/invoices" className={({ isActive }) => isActive ? 'active' : undefined}>
                <i className="fas fa-file-invoice-dollar"></i> Invoices
            </NavLink>
            <NavLink to="/inventory" className={({ isActive }) => isActive ? 'active' : undefined}>
                <i className="fas fa-warehouse"></i> Inventory
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : undefined}>
                <i className="fas fa-boxes"></i> Products
            </NavLink>
            <h3>Other</h3>
            <NavLink to="/supplier" className={({ isActive }) => isActive ? 'active' : undefined}>
                <i className="fas fa-truck-loading"></i> Supplier
            </NavLink>
            <NavLink to="/user-management" className={({ isActive }) => isActive ? 'active' : undefined}>
                <i className="fas fa-users-cog"></i> User Management
            </NavLink>
            <DarkModeToggle />
        </div>
    );
}

export default Sidebar;