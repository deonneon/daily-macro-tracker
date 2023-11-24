import React, { useContext } from 'react';
import { DietContext } from './DietContext';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line 
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(...registerables, annotationPlugin);

const Dashboard = () => {
    const { dailyDiet } = useContext(DietContext);

    const lastSevenDaysData = dailyDiet.slice(-7);

    // Aggregate proteins per day
    const totalProteinsPerDay = lastSevenDaysData.reduce((acc, entry) => {
        acc[entry.date] = (acc[entry.date] || 0) + Number(entry.protein);
        return acc;
    }, {});

    // Aggregate calories per day
    const totalCaloriesPerDay = lastSevenDaysData.reduce((acc, entry) => {
        acc[entry.date] = (acc[entry.date] || 0) + Number(entry.calories);
        return acc;
    }, {});

    const dates = Object.keys(totalProteinsPerDay);
    const proteinValues = Object.values(totalProteinsPerDay);
    const calorieValues = Object.values(totalCaloriesPerDay);

    const calorieData = {
        labels: dates,
        datasets: [
            {
                label: 'Calories',
                data: calorieValues,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const proteinData = {
        labels: dates,
        datasets: [
            {
                label: 'Proteins',
                data: proteinValues,
                fill: false,
                borderColor: 'rgb(153, 102, 255)',
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 1,
        borderDash: [5, 15],
        title: {
            display: true,
            position: 'top',
            text: 'Your Chart Title Here'  // Replace this with your desired title
        },
        plugins: {
            legend: {
                display: false
            },
            annotation: {
                annotations: calorieValues.map((value, index) => ({
                  type: 'label',
                  xValue: index,
                  yValue: value,
                  content: `${value}`,
                  backgroundColor: 'rgba(0,0,0,0)', // transparent background
                  borderColor: 'rgba(0,0,0,0)', // transparent border
                  yAdjust: -10, // adjust the position above the line
                  font: {
                    size: 12,
                    weight: 'bold'
                  },
                  color: 'rgb(75, 192, 192)', // text color
                })),
              },
        },
        scales: {
            x: {
                ticks: {
                    display: true,
                },
                gridLines: {
                    display: false  // This hides the grid lines for the y-axis
                },
                grid: {
                    drawBorder: false,
                    lineWidth: 0 // <-- this removes vertical lines between bars
                },
                scaleLabel: {
                    display: false  // This hides the axis label itself
                }
            },
            y: {
                ticks: {
                    display: true,
                    // Ensuring only integer values are displayed
                    callback: function (value) {
                        if (value % 1 === 0) {
                            return value;
                        }
                    }
                },
                gridLines: {
                    display: false  // This hides the grid lines for the y-axis
                },
                grid: {
                    drawBorder: false,
                    lineWidth: 0 // <-- this removes vertical lines between bars
                },
                scaleLabel: {
                    display: false
                }
            }
        }
    };
    


    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total Calories: {calorieValues}</p>
            <p>Total Protein: {proteinValues}g</p>
            <div className="chartsContainer">
                <Line data={proteinData} options={options} />
                <Line data={calorieData} options={options} />
            </div>
        </div>
    );
};

export default Dashboard;

