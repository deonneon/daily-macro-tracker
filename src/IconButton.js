import React, { useContext } from 'react';
import { DietContext } from './DietContext';

const IconButton = ({ foodName, icon }) => {
    const { database, dailyDiet, setDailyDiet } = useContext(DietContext);

    // Check if the food exists in the database
    const foodExists = database[foodName];

    // If the food doesn't exist, don't display anything
    if (!foodExists) return null;

    const handleButtonClick = () => {
        const foodDetails = database[foodName];
        setDailyDiet([...dailyDiet, { ...foodDetails, name: foodName }]);
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
