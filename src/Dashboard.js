import React, { useContext } from 'react';
import { DietContext } from './DietContext';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line 
import Chart from 'chart.js/auto';


const Dashboard = () => {
    const { dailyDiet } = useContext(DietContext);

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Filter entries from the last 7 days
    const lastSevenDaysData = dailyDiet.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= sevenDaysAgo && entryDate <= today;
    });


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

    const dates = Object.keys(totalProteinsPerDay).map(dateStr => {
        const dateObj = new Date(dateStr);
        return dateObj.getDate(); // Get only the day part
    });

    const uniqueDates = [...new Set(dates)];
    const proteinValues = Object.values(totalProteinsPerDay);
    const calorieValues = Object.values(totalCaloriesPerDay);

    const calorieData = {
        labels: uniqueDates,
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
        labels: uniqueDates,
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

    const latestData = lastSevenDaysData.length > 0 ? lastSevenDaysData[lastSevenDaysData.length - 1] : null;

    // Only proceed if latestData is not null
    let latestProteinSum = 0;
    let latestCalorieSum = 0;
    
    if (latestData) {
        latestProteinSum = totalProteinsPerDay[latestData.date] || 0;
        latestCalorieSum = totalCaloriesPerDay[latestData.date] || 0;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Latest Date Total Protein: {Math.round(latestProteinSum)}g</p>
            <p>Latest Date Total Calories: {Math.round(latestCalorieSum)}</p>
            <div className="chartsContainer">
                <Line data={proteinData} options={options} />
                <Line data={calorieData} options={options} />
            </div>
        </div>
    );
};

export default Dashboard;


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
        }
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

