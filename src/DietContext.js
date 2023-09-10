import React, { createContext, useState, useEffect } from 'react';

export const DietContext = createContext();

export const DietProvider = ({ children }) => {
    // declare local storage
    const initialDatabase = JSON.parse(localStorage.getItem('database')) || {};
    // establish database
    const [database, setDatabase] = useState(initialDatabase);
    const savedDailyDiet = JSON.parse(localStorage.getItem('dailyDiet'));
    const [dailyDiet, setDailyDiet] = useState(savedDailyDiet || []);
    //update local storage on change
    useEffect(() => {
        localStorage.setItem('database', JSON.stringify(database));
    }, [database]);
    useEffect(() => {
        localStorage.setItem('dailyDiet', JSON.stringify(dailyDiet));
    }, [dailyDiet]);

    const removeFoodEntry = (index) => {
        const newDailyDiet = [...dailyDiet];
        newDailyDiet.splice(index, 1);
        setDailyDiet(newDailyDiet);
    };

    const removeFoodFromDatabase = (foodName) => {
        const newDatabase = { ...database };
        delete newDatabase[foodName];
        setDatabase(newDatabase);
    };

    return (
        <DietContext.Provider value={{ database, setDatabase, dailyDiet, setDailyDiet, removeFoodEntry, removeFoodFromDatabase }}>
            {children}
        </DietContext.Provider>
    );
};
