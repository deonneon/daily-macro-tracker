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
import { FaBars } from 'react-icons/fa'; // FaBars is a common hamburger icon in Font Awesome


function App() {
  const [currentPage, setCurrentPage] = useState('main');

  return (
    <DietProvider>
      <div className="App">
        <div style={{ display: 'none' }}>
          <Navbar setCurrentPage={setCurrentPage} />
        </div>

        {currentPage === 'main' && (
          <div className="container">
            <div className="journal-container">
              {/* Your journal pages go here */}
              <div className="journal-page">
                <div className="main-content">
                  <div className="journal-top">
                    <h1>Daily Macro Tracker</h1>
                    <FoodInput />
                    <DailyDietList />
                  </div>
                  <Dashboard />
                </div>
              </div>
              <div className="journal-page">
                <div className="main-content">
                  <div className="journal-top">
                    <h1>Food Macro Daily Log</h1>
                    <FoodInput />
                    <DailyDietList />
                  </div>
                  <Dashboard />
                </div>
              </div>
              {/* More pages as needed */}
            </div>
            <div className="sidebar">
              <div className="sidebar-foodlist">
                <DatabasePage />
              </div>
              <div className="iconbar">
                <IconButton foodName="rice" icon={riceIcon} />
                <IconButton foodName="banana" icon={bananaIcon} />
              </div>
              <div className="credits signature">
                Built by Deon
                <div class="seal">
                  <FaBars className="hamburger-icon" />
                </div>
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
