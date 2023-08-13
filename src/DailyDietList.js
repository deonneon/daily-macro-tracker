import React, { useContext } from 'react';
import { DietContext } from './DietContext';

const DailyDietList = () => {
    const { dailyDiet } = useContext(DietContext);

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
                    <tr key={index}>
                        <td>{food.date}</td>
                        <td>{food.name}</td>
                        <td className="right-align">{food.protein}g</td>
                        <td className="right-align">{food.calories}</td>
                        <td>{food.unit}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DailyDietList;
