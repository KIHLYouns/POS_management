import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	toggleDarkMode,
	setDarkModeFromLocalStorage,
} from "../actions/darkModeActions";

function Sidebar() {
	const dispatch = useDispatch();
	const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

	useEffect(() => {
		const root = document.documentElement;
		const isDarkModeFromStorage =
			localStorage.getItem("isDarkMode") === "true";
		dispatch(setDarkModeFromLocalStorage(isDarkModeFromStorage));
		if (isDarkMode) {
			root.classList.add("dark-mode");
		} else {
			root.classList.remove("dark-mode");
		}
	}, [isDarkMode, dispatch]);

	const handleToggle = (e) => {
		e.preventDefault();
		localStorage.setItem("isDarkMode", !isDarkMode);
		dispatch(toggleDarkMode());
	};

	return (
		<div className="sidebar">
			<NavLink
				to="/dashboard"
				className={({ isActive }) => (isActive ? "active" : undefined)}
			>
				<i className="fas fa-chart-line "></i> Dashboard
			</NavLink>
			<NavLink
				to="/orders"
				className={({ isActive }) => (isActive ? "active" : undefined)}
			>
				<i className="fas fa-clipboard-list"></i> Orders
			</NavLink>
			<NavLink
				to="/invoices"
				className={({ isActive }) => (isActive ? "active" : undefined)}
			>
				<i className="fas fa-file-invoice-dollar"></i> Invoices
			</NavLink>
			<NavLink
				to="/inventory"
				className={({ isActive }) => (isActive ? "active" : undefined)}
			>
				<i className="fas fa-warehouse"></i> Inventory
			</NavLink>
			<NavLink
				to="/products"
				className={({ isActive }) => (isActive ? "active" : undefined)}
			>
				<i className="fas fa-boxes"></i> Products
			</NavLink>
			<h3>Other</h3>
			<NavLink
				to="/supplier"
				className={({ isActive }) => (isActive ? "active" : undefined)}
			>
				<i className="fas fa-truck-loading"></i> Supplier
			</NavLink>
			<NavLink
				to="/user-management"
				className={({ isActive }) => (isActive ? "active" : undefined)}
			>
				<i className="fas fa-users-cog"></i> User Management
			</NavLink>
			<a href="#" onClick={handleToggle}>
				<i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
				Dark Mode
			</a>
		</div>
	);
}

export default Sidebar;
