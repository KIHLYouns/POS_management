// React_Frontend/src/components/Dashboard/Dashboard.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer, // Added import for ResponsiveContainer
} from "recharts";
import { fetchTransactions } from "../../actions/transactionActions";
import { fetchInventoryItems } from "../../actions/inventoryActions";

function Dashboard() {
    const dispatch = useDispatch();
    const inventory = useSelector((state) => state.inventory?.inventory || []);
    const products = useSelector((state) => state.products?.products || []);
    const transactions = useSelector(
        (state) => state.transactions?.transactions || []
    );

    // Calculate total inventory value
    const totalInventoryValue = inventory.reduce((total, item) => {
        return total + item.stockQuantity * item.retailPrice;
    }, 0);

    // Calculate total sales
    const totalSales = transactions.reduce((total, transaction) => {
        return total + transaction.totalAmount;
    }, 0);

    // Prepare data for charts
    const salesData = transactions.map((transaction) => ({
        date: transaction.date,
        amount: transaction.totalAmount,
    }));

    const inventoryData = inventory.map((item) => ({
        name: item.product.name,
        quantity: item.stockQuantity,
    }));

    // Calculate product sales by category
    const categorySales = {};
    transactions.forEach((transaction) => {
        transaction.items.forEach((item) => {
            const category = item.inventoryItem?.product?.category?.name; // Access category correctly
            if (category) {
                categorySales[category] =
                    (categorySales[category] || 0) +
                    item.quantitySold * item.finalUnitPrice;
            }
        });
    });

    // Prepare data for pie chart
    const pieChartData = Object.entries(categorySales).map(
        ([category, amount]) => ({
            name: category,
            value: amount,
        })
    );

    // Fetch data on mount
    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchInventoryItems());
    }, [dispatch]);

    // Fetch updated data every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(fetchTransactions());
            dispatch(fetchInventoryItems());
        }, 5000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1919", "#19FF19", "#1919FF", "#FF19FF", "#19FFFF"];

    return (
        <div className="main-content">
            <div className="header">
                <h2>Dashboard</h2>
            </div>
            <div className="dashboard-content">
                <div className="kpi-container">
                    <div className="kpi">
                        <h3>Total Inventory Value</h3>
                        <p>${totalInventoryValue.toFixed(2)}</p>
                    </div>
                    <div className="kpi">
                        <h3>Total Sales</h3>
                        <p>${totalSales.toFixed(2)}</p>
                    </div>
                </div>

                <div className="chart-container">
                    <div className="chart">
                        <h3>Sales Over Time</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={salesData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <XAxis dataKey="date" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart">
                        <h3>Inventory Levels</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={inventoryData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="quantity" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart">
                        <h3>Sales by Category</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;