import React from 'react';
import './styles.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} My Resume. All rights reserved.</p>
        <div className="social-links">
          <a href="#" aria-label="GitHub">
            GitHub
          </a>
          <a href="#" aria-label="LinkedIn">
            LinkedIn
          </a>
          <a href="#" aria-label="Twitter">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;