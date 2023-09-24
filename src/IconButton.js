import React, { useContext } from 'react';
import { DietContext } from './DietContext';

function getTodayDate() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();

    const year = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone }).format(now);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit', timeZone }).format(now);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit', timeZone }).format(now);

    return `${year}-${month}-${day}`;
}

const IconButton = ({ foodName, icon }) => {
    const { database, dailyDiet, setDailyDiet } = useContext(DietContext);

    // Check if the food exists in the database
    const foodExists = database[foodName];

    // If the food doesn't exist, don't display anything
    if (!foodExists) return null;

    const handleButtonClick = () => {
        const foodDetails = database[foodName];
        setDailyDiet([...dailyDiet, { ...foodDetails, name: foodName, date: getTodayDate() }]);
    };

    return (
        <button onClick={handleButtonClick}
            className="icon-button"
            title={`${foodExists.unit} of ${foodName}`}
        >
            <img src={icon} alt={`${foodName} icon`} />
        </button>
    );
};

export default IconButton;
