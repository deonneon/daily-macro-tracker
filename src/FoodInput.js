import React, { useState, useContext, useRef, useEffect } from 'react';
import { DietContext } from './DietContext';
import './styles.css';

const FoodInput = () => {
    const { database, setDatabase, dailyDiet, setDailyDiet } = useContext(DietContext);
    const [input, setInput] = useState('');
    const [proteinInput, setProteinInput] = useState('');
    const [calorieInput, setCalorieInput] = useState('');
    const [unitInput, setUnitInput] = useState('');
    const [matchingFoods, setMatchingFoods] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        if (e.target.value) {
            const matches = Object.keys(database).filter(food =>
                food.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setMatchingFoods(matches);
        } else {
            setMatchingFoods([]);
        }
    };

    const handleDropdownClick = (foodName) => {
        setInput(foodName);
        setMatchingFoods([]);
        inputRef.current.focus();
    };

    const handleAddFood = () => {
        if (!database[input]) {
            setShowForm(true);
            return;
        }
        setDailyDiet([...dailyDiet, { name: input, ...database[input] }]);
        setInput('');
    };

    const handleSubmitNewFood = () => {
        setDatabase({
            ...database,
            [input]: {
                protein: proteinInput,
                calories: calorieInput,
                unit: unitInput
            }
        });
        setDailyDiet([...dailyDiet, { name: input, protein: proteinInput, calories: calorieInput, unit: unitInput }]);
        setInput('');
        setProteinInput('');
        setCalorieInput('');
        setUnitInput('');
        setShowForm(false);
    };

    return (
        <div className="foodInput">
            <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onBlur={() => setTimeout(() => setMatchingFoods([]), 150)}
                placeholder="Enter food name"
            />
            {matchingFoods.length > 0 && (
                <div style={{ border: '1px solid #ccc', position: 'absolute', zIndex: 1, background: '#fff' }}>
                    {matchingFoods.map(food => (
                        <div
                            key={food}
                            onClick={() => handleDropdownClick(food)}
                            style={{ padding: '8px', cursor: 'pointer' }}
                        >
                            {food}
                        </div>
                    ))}
                </div>
            )}
            <button onClick={handleAddFood}>Add Food</button>

            {showForm && (
                <div className="showForm">
                    <p>Please fill in as much as possible.</p>
                    <input value={proteinInput} onChange={(e) => { setProteinInput(e.target.value); }} placeholder="Protein" />
                    <input value={calorieInput} onChange={(e) => { setCalorieInput(e.target.value); }} placeholder="Calories" />
                    <input value={unitInput} onChange={(e) => setUnitInput(e.target.value)} placeholder="Unit" />
                    <button onClick={handleSubmitNewFood} >Submit New Food</button>
                </div>
            )}
        </div>
    );
};

export default FoodInput;
