import React from "react";

function Header() {
	return (
		<div className="main-header">
			<div className="header">
				<div className="logo">
					<img src="/Logo.png" alt="Company Logo" />
					<h3 className="logo-text">Stock Manager</h3>
				</div>
				<div className="user-profile">
					<i className="fas fa-bell icon" aria-label="Notifications"></i>
					<i className="fas fa-user-circle icon" aria-label="User Profile"></i>
					<span className="username">LKIHAL</span>
					<i className="fas fa-chevron-down icon" aria-label="Profile Options"></i>
				</div>
			</div>
		</div>
	);
}

export default Header;
