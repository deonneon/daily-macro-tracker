import React, { useContext } from 'react';
import { DietContext } from './DietContext';

const DailyDietList = () => {
    const { dailyDiet } = useContext(DietContext);

    return (
        <table className="dailyDietTable">
            <thead>
                <tr>
                    <th>Food</th>
                    <th>Protein</th>
                    <th>Calories</th>
                    <th>Unit</th>
                </tr>
            </thead>
            <tbody>
                {dailyDiet.map((food, index) => (
                    <tr key={index}>
                        <td>{food.name}</td>
                        <td>{food.protein}</td>
                        <td>{food.calories}</td>
                        <td>{food.unit}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DailyDietList;
