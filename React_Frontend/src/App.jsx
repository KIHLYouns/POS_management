import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products/Products";
import Inventory from "./components/Inventory/Inventory";
import Transactions from "./components/Transactions/Transactions";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";

function App() {
    return (
        <Router>
            <div>
                <Header />
                <div className="containerx">
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/orders" element={<Transactions />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;