import React, { useContext } from 'react';
import { DietContext } from './DietContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const DailyDietList = () => {
    const { dailyDiet, removeFoodEntry } = useContext(DietContext);

    return (
        <table className="dailyDietTable">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Food</th>
                    <th className="right-align">Protein</th>
                    <th className="right-align">Calories</th>
                    <th>Unit</th>
                </tr>
            </thead>
            <tbody>
                {dailyDiet.map((food, index) => (
                    <tr key={index} className="foodRow">
                        <td>{food.date}</td>
                        <td>{food.name}</td>
                        <td className="right-align">{food.protein}g</td>
                        <td className="right-align">{food.calories}</td>
                        <td>{food.unit}</td>
                        <td>
                            <FontAwesomeIcon className="trashIcon" icon={faTrash} onClick={() => removeFoodEntry(index)} style={{ cursor: 'pointer' }} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DailyDietList;
