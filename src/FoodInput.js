import React, { useState, useContext, useRef } from 'react';
import { DietContext } from './DietContext';
import './styles.css';
import AIQueryComponent from './AIQueryComponent';

function getTodayDate() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const year = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone }).format(now);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit', timeZone }).format(now);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit', timeZone }).format(now);
    return `${year}-${month}-${day}`;
}

const isValidNumberOrBlank = (value) => {
    return /^(\d+(\.\d+)?)?$/.test(value);
};

const FoodInput = () => {
    const { database, setDatabase, dailyDiet, setDailyDiet, addFoodToDatabase } = useContext(DietContext);
    const [input, setInput] = useState('');
    const [proteinInput, setProteinInput] = useState('');
    const [calorieInput, setCalorieInput] = useState('');
    const [unitInput, setUnitInput] = useState('');
    const [matchingFoods, setMatchingFoods] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const inputRef = useRef(null);
    const [hideAIResponse, setHideAIResponse] = useState(false);
    const [aiDataReturned, setAIDataReturned] = useState(false);

    const handleInputChange = (e) => {
        const lowercasedValue = e.target.value ? e.target.value.toLowerCase() : '';;
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

    const handleDropdownClick = (foodName) => {
        setInput(foodName);
        setMatchingFoods([]);
        inputRef.current.focus();
    };

    const handleAddFood = () => {
        if (input.trim() === '') {
            return;
        }

        const currentDate = getTodayDate();
        if (!database[input]) {
            setShowForm(true);
            setShowCancel(true);
            return;
        }
        setDailyDiet([...dailyDiet, { date: currentDate, name: input, ...database[input] }]);
        setInput('');
    };

    const handleCancel = () => {
        setShowForm(false);
        setInput('');
        setShowCancel(false);
        setAIDataReturned(false);
    };

    const handleKeyDownAdd = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            handleAddFood();
        }
    };

    const handleSubmitNewFood = async () => {
        if (input.trim() === '') {
            return;
        }

        const currentDate = getTodayDate();

        const newFoodData = {
            name: input,
            protein: proteinInput,
            calories: calorieInput,
            unit: unitInput,
        };

        // Add to local state
        setDatabase({
            ...database,
            [input]: newFoodData
        });

        await addFoodToDatabase(newFoodData);

        setDailyDiet([...dailyDiet, { date: currentDate, name: input, protein: proteinInput, calories: calorieInput, unit: unitInput }]);
        setInput('');
        setProteinInput('');
        setCalorieInput('');
        setUnitInput('');
        setShowForm(false);
        setShowCancel(false);
        setHideAIResponse(true);
        setAIDataReturned(false);
    };

    const handleAIData = (data) => {
        if (data) {
            setInput(data.food_name.toLowerCase() || '');
            setProteinInput(data.protein || '');
            setCalorieInput(data.calories || '');
            setUnitInput(data.measurement || '');
            setShowForm(true);
            setHideAIResponse(false);
            setAIDataReturned(true);
        }
    };

    return (
        <div className="foodInput">
            <input
                name="foodInputName"
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDownAdd}
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
            {showCancel ? (
                <button onClick={handleCancel}>Cancel</button>
            ) : (
                <button onClick={handleAddFood} disabled={!input.trim()}>Add Food</button>
            )}

            <AIQueryComponent onDataReceived={handleAIData} hideResponse={hideAIResponse} />

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="showForm">
                            <p>{aiDataReturned ? "We guesstimated the amount. Please Review." : "Please fill in as much as possible."}</p>
                            <input value={proteinInput} onChange={handleProteinInputChange} placeholder="Protein" />
                            <input value={calorieInput} onChange={handleCalorieInputChange} placeholder="Calories" />
                            <input value={unitInput} onChange={(e) => setUnitInput(e.target.value)} placeholder="Unit of Measurement" />
                            <button onClick={handleSubmitNewFood} disabled={!input.trim()}>Submit New Food</button>
                            <button className="modal-cancel-button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>  
            )}
        </div>
    );
};

export default FoodInput;
