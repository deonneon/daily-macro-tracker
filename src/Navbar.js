import React from 'react';
import './styles.css';

const Navbar = ({ setCurrentPage }) => {
    return (
        <div className="navbar">
            <button onClick={() => setCurrentPage('main')}>Main Page</button>
            <button onClick={() => setCurrentPage('history')}>Log History</button>
            <button onClick={() => setCurrentPage('database')}>Database</button>
            <button onClick={() => setCurrentPage('qa')}>Q&A</button>
        </div>
    );
};

export default Navbar;
