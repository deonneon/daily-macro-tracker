import React, { useContext } from 'react';
import { DietContext } from './DietContext';

const DatabasePage = () => {
    const { database, dailyDiet, setDailyDiet } = useContext(DietContext);

    const handleFoodClick = (foodName) => {
        const foodDetails = database[foodName];
        setDailyDiet([...dailyDiet, { ...foodDetails, name: foodName }]);
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
