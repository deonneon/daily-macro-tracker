import React, { useState } from 'react';
import './styles.css';
import { DietProvider } from './DietContext';
import Navbar from './Navbar';
import FoodInput from './FoodInput';
import DailyDietList from './DailyDietList';
import Dashboard from './Dashboard';
import DatabasePage from './DatabasePage';
import IconButton from './IconButton';
import QAPage from './QAPage';
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
              <div className="credits">
                Built by Deon
              </div>
            </div>
          </div>
        )}

        {currentPage === 'database' && <DatabasePage />}
        {currentPage === 'history' && <div><DailyDietList /></div>}
        {currentPage === 'qa' && <QAPage />} {/* Render the QAPage when currentPage is 'qa' */}
      </div>
    </DietProvider>
  );
}

export default App;
