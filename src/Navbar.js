import React from 'react';

const Navbar = ({ setCurrentPage }) => {
    return (
        <div className="navbar">
            <button onClick={() => setCurrentPage('main')}>Main Page</button>
            <button onClick={() => setCurrentPage('history')}>Historic Diet</button>
            <button onClick={() => setCurrentPage('database')}>Database</button>
        </div>
    );
};

export default Navbar;
