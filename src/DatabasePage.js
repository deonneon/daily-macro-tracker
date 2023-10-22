import React, { useContext } from 'react';
import { DietContext } from './DietContext';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');  // months are 0-based in JavaScript
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const DatabasePage = () => {
    const { database, removeFoodFromDatabase, addFoodEntryToDailyDiet } = useContext(DietContext);

    const handleFoodClick = (foodName) => {
        console.log(getTodayDate());
        const foodDetails = { ...database[foodName], name: foodName };
        const food_id = foodDetails.id;  // Update this line to use 'id' instead of 'food_id'
        addFoodEntryToDailyDiet(food_id, getTodayDate());

    };

    return (
        <div>
            <h2>Food Database</h2>
            <table>
                <thead>
                    <tr>
                        <th>Food</th>
                        <th className="right-align">Protein</th>
                        <th className="right-align">Calories</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(database).map(([foodName, foodDetails]) => (
                        <tr key={foodName} className="foodRow" onClick={() => handleFoodClick(foodName)} style={{ cursor: 'pointer' }}>
                            <td>{foodName}</td>
                            <td className="right-align">{foodDetails.protein}</td>
                            <td className="right-align">{foodDetails.calories}</td>
                            <td>{foodDetails.unit}</td>
                            <td>
                                <FontAwesomeIcon className="trashIcon" icon={faTrash} onClick={(e) => { e.stopPropagation(); removeFoodFromDatabase(foodName); }} style={{ cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DatabasePage;
