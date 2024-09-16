import React from "react";
import { FaDollarSign, FaTag, FaShoppingCart, FaChartLine, FaBox } from 'react-icons/fa';

function DashboardKPIs({ totalInventoryCost, totalInventoryRetail, totalSales, totalProfit, totalItemsSold }) {
    return (
        <>
            <div className="kpi-container">
                <div className="kpi">
                    <h4><FaTag /> Total Inventory Cost</h4>
                    <p><FaDollarSign />{totalInventoryCost.toFixed(2)}</p>
                </div>
                <div className="kpi">
                    <h4><FaTag /> Total Inventory Retail Value</h4>
                    <p><FaDollarSign />{totalInventoryRetail.toFixed(2)}</p>
                </div>
            </div>
            <div className="kpi-container">
                <div className="kpi">
                    <h4><FaShoppingCart /> Total Sales</h4>
                    <p><FaDollarSign />{totalSales.toFixed(2)}</p>
                </div>
                <div className="kpi">
                    <h4><FaBox /> Total Items Sold</h4>
                    <p>{totalItemsSold}</p>
                </div>
                <div className="kpi">
                    <h4><FaChartLine /> Total Profit</h4>
                    <p><FaDollarSign />{totalProfit.toFixed(2)}</p>
                </div>
            </div>
        </>
    );
}

export default DashboardKPIs;