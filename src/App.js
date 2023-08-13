import React, { useState } from 'react';
import './styles.css';  // Importing the styles we created
import { DietProvider } from './DietContext';
import Navbar from './Navbar';
import FoodInput from './FoodInput';
import DailyDietList from './DailyDietList';
import Dashboard from './Dashboard';
import DatabasePage from './DatabasePage';
import IconButton from './IconButton';
import riceIcon from './icons/rice.png';
import bananaIcon from './icons/banana.png';

function App() {
  const [currentPage, setCurrentPage] = useState('main');

  return (
    <DietProvider>
      <div className="App">
        <Navbar setCurrentPage={setCurrentPage} />

        {currentPage === 'main' && (
          <div className="container">
            <div className="main-content">
              <h1>Food Macro Daily Log</h1>
              <FoodInput />
              <DailyDietList />
              <Dashboard />
            </div>
            <div className="sidebar">
              <div className="sidebar-foodlist">
                <DatabasePage />
              </div>
              <div className="iconbar">
                <IconButton foodName="rice" icon={riceIcon} />
                <IconButton foodName="banana" icon={bananaIcon} />
              </div>
            </div>
          </div>
        )}

        {currentPage === 'database' && <DatabasePage />}

        {currentPage === 'history' && <div>Historic Diet Page (To be implemented)</div>}
      </div>
    </DietProvider>
  );
}

export default App;
