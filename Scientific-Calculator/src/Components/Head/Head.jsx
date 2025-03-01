import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import "./Head.css";

const Head = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className='head'>
      <div className="head-left">
        <h1>Scientific Calculator</h1>
      </div>
      <div 
        className={`theme-toggle ${isDarkMode ? 'active' : ''}`}
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        <div className="toggle-slider" />
        <div className="icon sun">
          <FontAwesomeIcon icon={faSun} />
        </div>
        <div className="icon moon">
          <FontAwesomeIcon icon={faMoon} />
        </div>
      </div>
    </div>
  );
};

export default Head;
