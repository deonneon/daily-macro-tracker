import React, { useContext } from 'react';
import { DietContext } from './DietContext';

function getTodayDate() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();

    const year = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone }).format(now);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit', timeZone }).format(now);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit', timeZone }).format(now);

    return `${year}-${month}-${day}`;
}

const DatabasePage = () => {
    const { database, dailyDiet, setDailyDiet } = useContext(DietContext);

    const handleFoodClick = (foodName) => {
        const foodDetails = database[foodName];
        const updatedDailyDiet = [...dailyDiet, { ...foodDetails, name: foodName, date: getTodayDate() }];

        setDailyDiet(updatedDailyDiet);
        localStorage.setItem('dailyDiet', JSON.stringify(updatedDailyDiet));
    };

    return (
        <div>
            <h2>Food Database</h2>
            <table>
                <thead>
                    <tr>
                        <th>Food</th>
                        <th>Protein</th>
                        <th>Calories</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(database).map(([foodName, foodDetails]) => (
                        <tr key={foodName} onClick={() => handleFoodClick(foodName)} style={{ cursor: 'pointer' }}>
                            <td>{foodName}</td>
                            <td>{foodDetails.protein}</td>
                            <td>{foodDetails.calories}</td>
                            <td>{foodDetails.unit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DatabasePage;
