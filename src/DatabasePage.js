import React, { useContext } from 'react';
import { DietContext } from './DietContext';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function getTodayDate() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();

    const year = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone }).format(now);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit', timeZone }).format(now);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit', timeZone }).format(now);

    return `${year}-${month}-${day}`;
}

const DatabasePage = () => {
    const { database, removeFoodFromDatabase, addFoodEntryToDailyDiet } = useContext(DietContext);

    const handleFoodClick = (foodName) => {
        const foodDetails = { ...database[foodName], name: foodName, id: database[foodName].id };
        addFoodEntryToDailyDiet(foodDetails, getTodayDate());
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
