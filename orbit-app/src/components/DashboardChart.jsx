import React from "react";
import { Line as LineChart } from "react-chartjs-2";
import { formatCurrency } from "./../util";

// Import necessary Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Import Filler for background color
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardChart = ({ salesData }) => {
  // Ensure salesData is an array before mapping
  if (!Array.isArray(salesData)) {
    // Optionally return null, a loading indicator, or an error message
    console.error("DashboardChart received invalid salesData:", salesData);
    return <p>Chart data is unavailable.</p>;
  }

  const chartLabels = salesData.map((sale) => sale.date);
  const chartValues = salesData.map((sale) => sale.amount);

  // Define the chart data object directly
  const chartDataObject = {
    labels: chartLabels,
    datasets: [
      {
        label: "Sales",
        borderColor: "#3182ce", // Blue line color
        data: chartValues,
        fill: true, // Enable filling area under the line
        backgroundColor: "rgba(49, 130, 206, 0.2)", // Light blue background, adjust alpha for transparency
        tension: 0.3, // Keep the line tension
        borderWidth: 1.5, // Keep the border width
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend if not needed
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    elements: {
      point: { radius: 0 }, // Keep points invisible
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        // Use 'y' instead of 'yAxes' for Chart.js v3+
        ticks: {
          callback: (value) => formatCurrency(value),
        },
        grid: {
          // Optional: customize y-axis grid lines
          // color: 'rgba(0, 0, 0, 0.1)'
        },
      },
    },
  };

  return (
    <div style={{ height: "250px" }}>
      {" "}
      {/* Set height on a container div */}
      <LineChart
        data={chartDataObject} // Pass the object directly
        options={chartOptions}
      />
    </div>
  );
};

export default DashboardChart;
