import React from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import { formatCurrency } from './../util';

const DashboardChart = ({ salesData }) => {
  const chartLabels = salesData.map(sale => sale.date);
  const chartValues = salesData.map(sale => sale.amount);

  const chartData = canvas => {
    const ctx = canvas.getContext('2d');
    var gradientFill = ctx.createLinearGradient(
      0,
      0,
      0,
      250
    );
    gradientFill.addColorStop(0, 'rgba(0, 97, 215, 0.3)');
    gradientFill.addColorStop(1, 'rgba(0, 200, 255, 0)');
    return {
      labels: chartLabels,
      datasets: [
        {
          label: 'Sales',
          borderColor: '#3182ce',
          data: chartValues,
          backgroundColor: gradientFill
        }
      ]
    };
  };

  return (
    <LineChart
      height={100}
      data={chartData}
      options={{
        elements: {
          line: {
            tension: 0.3,
            borderWidth: 1.5
          },
          point: { radius: 0 }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: value => formatCurrency(value)
              }
            }
          ]
        }
      }}
    />
  );
};

export default DashboardChart;
