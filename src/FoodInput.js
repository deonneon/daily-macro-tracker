import React, { useState, useContext, useRef, useEffect } from 'react';
import { DietContext } from './DietContext';
import './styles.css';

function getTodayDate() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();

    const year = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone }).format(now);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit', timeZone }).format(now);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit', timeZone }).format(now);

    return `${year}-${month}-${day}`;
}

const isValidNumberOrBlank = (value) => {
    // This regex checks if the string is a valid int or blank
    return /^(\d+(\.\d+)?)?$/.test(value);
};

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
        const lowercasedValue = e.target.value.toLowerCase();
        setInput(lowercasedValue);

        if (lowercasedValue) {
            const matches = Object.keys(database).filter(food =>
                food.toLowerCase().includes(lowercasedValue)
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
        const currentDate = getTodayDate();
        if (!database[input]) {
            setShowForm(true);
            return;
        }
        setDailyDiet([...dailyDiet, { date: currentDate, name: input, ...database[input] }]);
        setInput('');
    };

    const handleSubmitNewFood = () => {
        const currentDate = getTodayDate();
        setDatabase({
            ...database,
            [input]: {
                protein: proteinInput,
                calories: calorieInput,
                unit: unitInput
            }
        });
        setDailyDiet([...dailyDiet, { date: currentDate, name: input, protein: proteinInput, calories: calorieInput, unit: unitInput }]);
        setInput('');
        setProteinInput('');
        setCalorieInput('');
        setUnitInput('');
        setShowForm(false);
    };

    const handleProteinInputChange = (e) => {
        if (isValidNumberOrBlank(e.target.value)) {
            setProteinInput(e.target.value);
        }
    };

    const handleCalorieInputChange = (e) => {
        if (isValidNumberOrBlank(e.target.value)) {
            setCalorieInput(e.target.value);
        }
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
                    <input value={proteinInput} onChange={handleProteinInputChange} placeholder="Protein" />
                    <input value={calorieInput} onChange={handleCalorieInputChange} placeholder="Calories" />
                    <input value={unitInput} onChange={(e) => setUnitInput(e.target.value)} placeholder="Unit" />
                    <button onClick={handleSubmitNewFood} >Submit New Food</button>
                </div>
            )}
        </div>
    );
};

export default FoodInput;
