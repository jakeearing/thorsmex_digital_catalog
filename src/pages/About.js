import React, { useEffect } from 'react';
import '../assets/styles/about.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content-container">
        <div className="left-column-image">
        <img src={process.env.PUBLIC_URL + `/content-images/plant.jpg`} alt="Plant" />
        </div>
        <div className="right-column-text">
          <div className="right-column-content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
      <div className="about-content-container">
        <div className="left-column-text">
          <div className="left-column-content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
        <div className="right-column-image">
        <img src={process.env.PUBLIC_URL + `/content-images/plant.jpg`} alt="Plant" />
        </div>
      </div>
      <div className="about-content-container">
        <div className="left-column-image">
        <img src={process.env.PUBLIC_URL + `/content-images/plant.jpg`} alt="Plant" />
        </div>
        <div className="right-column-text">
          <div className="right-column-content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </div>
  );
}