import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../../actions/transactionActions";
import { fetchInventoryItems } from "../../actions/inventoryActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DashboardKPIs from "./DashboardKPIs";
import DashboardCharts from "./DashboardCharts";

function Dashboard() {
	const dispatch = useDispatch();
	const inventory = useSelector((state) => state.inventory?.inventory || []);
	const transactions = useSelector((state) => state.transactions?.transactions || []);

	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});

	useEffect(() => {
		dispatch(fetchTransactions());
		dispatch(fetchInventoryItems());
	}, [dispatch]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			dispatch(fetchTransactions());
			dispatch(fetchInventoryItems());
		}, 5000);

		return () => clearInterval(intervalId);
	}, [dispatch]);

	const filteredTransactions = transactions.filter((transaction) => {
		const date = new Date(transaction.date);
		const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
		const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;
		return (!startDate || date >= startDate) && (!endDate || date <= endDate);
	});

	const totalInventoryRetail = inventory.reduce((total, item) => total + item.stockQuantity * item.retailPrice, 0);
	const totalInventoryCost = inventory.reduce((total, item) => total + item.stockQuantity * item.vendorCost, 0);

	const totalSales = filteredTransactions.reduce((total, transaction) => total + transaction.totalAmount, 0);

	const totalProfit = filteredTransactions.reduce((total, transaction) => {
		const profit = transaction.items.reduce((acc, item) => {
			const vendorCost = item.inventoryItem ? item.inventoryItem.vendorCost : 0;
			return acc + (item.finalUnitPrice - vendorCost) * item.quantitySold;
		}, 0);
		return total + profit;
	}, 0);

	const totalItemsSold = filteredTransactions.reduce(
		(total, transaction) => total + transaction.items.reduce((acc, item) => acc + item.quantitySold, 0),
		0
	);

	const topSellingProductsData = filteredTransactions.reduce((acc, transaction) => {
		transaction.items.forEach((item) => {
			const productName = item.inventoryItem?.product?.name;
			if (productName) {
				const quantitySold = item.quantitySold;
				acc[productName] = (acc[productName] || 0) + quantitySold;
			}
		});
		return acc;
	}, {});

	const topSellingProductsChartData = Object.entries(topSellingProductsData)
		.map(([name, quantitySold]) => ({ name, quantitySold }))
		.sort((a, b) => b.quantitySold - a.quantitySold)
		.slice(0, 5);

	const profitabilityData = filteredTransactions.map((transaction) => ({
		date: transaction.date,
		profit: transaction.items.reduce((acc, item) => {
			const vendorCost = item.inventoryItem ? item.inventoryItem.vendorCost : 0;
			return acc + (item.finalUnitPrice - vendorCost) * item.quantitySold;
		}, 0),
	}));

	const salesData = filteredTransactions.map((transaction) => ({
		date: transaction.date,
		amount: transaction.totalAmount,
	}));

	const filteredSalesData = salesData.filter((data) => {
		const date = new Date(data.date);
		const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
		const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;
		return (!startDate || date >= startDate) && (!endDate || date <= endDate);
	});

	const inventoryData = inventory.map((item) => ({
		name: item.product.name,
		stockQuantity: item.stockQuantity,
	}));

	const categorySales = {};
	filteredTransactions.forEach((transaction) => {
		transaction.items.forEach((item) => {
			const category = item.inventoryItem?.product?.category?.name;
			if (category) {
				categorySales[category] = (categorySales[category] || 0) + item.quantitySold * item.finalUnitPrice;
			}
		});
	});

	const pieChartData = Object.entries(categorySales).map(([category, amount]) => ({
		name: category,
		value: amount,
	}));

	const COLORS = [
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#FF8042",
		"#AF19FF",
		"#FF1919",
		"#19FF19",
		"#1919FF",
		"#FF19FF",
		"#19FFFF",
	];

	return (
		<div className="main-content">
			<div className="header">
				<h2>Dashboard</h2>
			</div>
			<div className="dashboard-content">
				<div className="filter-container">
					<DatePicker
						selected={dateRange.startDate}
						onChange={(date) =>
							setDateRange((prev) => ({
								...prev,
								startDate: date,
							}))
						}
						selectsStart
						startDate={dateRange.startDate}
						endDate={dateRange.endDate}
						isClearable={true}
						placeholderText="Start Date"
					/>
          <i class="fa fa-arrow-right"></i>
					<DatePicker
						selected={dateRange.endDate}
						onChange={(date) => setDateRange((prev) => ({ ...prev, endDate: date }))}
						selectsEnd
						startDate={dateRange.startDate}
						endDate={dateRange.endDate}
						minDate={dateRange.startDate}
						isClearable={true}
						placeholderText="End Date"
					/>
				</div>
				<DashboardKPIs
					totalInventoryRetail={totalInventoryRetail}
					totalInventoryCost={totalInventoryCost}
					totalSales={totalSales}
					totalProfit={totalProfit}
					totalItemsSold={totalItemsSold}
				/>
				<DashboardCharts
					topSellingProductsChartData={topSellingProductsChartData}
					profitabilityData={profitabilityData}
					inventoryData={inventoryData}
					pieChartData={pieChartData}
					filteredSalesData={filteredSalesData}
					COLORS={COLORS}
				/>
			</div>
		</div>
	);
}

export default Dashboard;
