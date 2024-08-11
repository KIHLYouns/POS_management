import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import "./App.css";
import Inventory from "./components/Inventory";

function App() {
	return (
		<Router>
			<div>
				<Header />
				<div className="containerx">
					<Sidebar />
					<Routes>
						<Route path="/products" element={<Products />} />
						<Route path="/inventory" element={<Inventory />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
