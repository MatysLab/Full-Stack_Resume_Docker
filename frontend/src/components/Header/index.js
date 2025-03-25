import React from 'react';
import './styles.css';

function Header() {
  return (
    <div className="header">
      <h1>My Resume</h1>
      <nav className="nav-menu">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Experience</a></li>
          <li><a href="#">Skills</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;