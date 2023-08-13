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

    return (
        <DietContext.Provider value={{ database, setDatabase, dailyDiet, setDailyDiet }}>
            {children}
        </DietContext.Provider>
    );
};
