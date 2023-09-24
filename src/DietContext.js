import React, { createContext, useState, useEffect } from 'react';

export const DietContext = createContext();

export const DietProvider = ({ children }) => {
    const [database, setDatabase] = useState({});
    const [dailyDiet, setDailyDiet] = useState([]);

    // Fetch initial data from server
    useEffect(() => {
        fetch('http://localhost:3001/foods')
            .then(res => res.json())
            .then(data => {
                const transformedData = {};
                data.forEach(item => {
                    transformedData[item.name] = {
                        id: item.id,
                        protein: item.protein,
                        calories: item.calories,
                        unit: item.unit
                    };
                });
                setDatabase(transformedData);
            })
            .catch(err => console.error('Failed to fetch foods:', err));

        fetch('http://localhost:3001/dailyDiet')
            .then(res => res.json())
            .then(data => setDailyDiet(data))
            .catch(err => console.error('Failed to fetch daily diet:', err));
    }, []);

    const removeFoodEntry = async (index) => {
        const id = dailyDiet[index].id;
        const newDailyDiet = [...dailyDiet];
        newDailyDiet.splice(index, 1);
        setDailyDiet(newDailyDiet);

        // Delete from server
        await fetch(`http://localhost:3001/dailyDiet/${id}`, { method: 'DELETE' });
    };

    const removeFoodFromDatabase = async (foodName) => {
        const newDatabase = { ...database };
        delete newDatabase[foodName];
        setDatabase(newDatabase);

        // Delete from server
        await fetch(`http://localhost:3001/foods/${foodName}`, { method: 'DELETE' });
    };

    const addFoodToDatabase = async (foodData) => {
        const response = await fetch('http://localhost:3001/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foodData),
        });
        const data = await response.json();
        setDatabase({ ...database, [foodData.name]: data });
    };

    const addFoodEntryToDailyDiet = async (foodDetails, date) => {
        const response = await fetch('http://localhost:3001/dailyDiet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date,
                food_id: foodDetails.id
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const newEntry = { ...foodDetails, date, id: data.id };
            setDailyDiet(prevDailyDiet => [...prevDailyDiet, newEntry]);
        }
    };

    return (
        <DietContext.Provider value={{ database, setDatabase, dailyDiet, setDailyDiet, removeFoodEntry, removeFoodFromDatabase, addFoodToDatabase, addFoodEntryToDailyDiet }}>
            {children}
        </DietContext.Provider>
    );
};

export default DietContext;
