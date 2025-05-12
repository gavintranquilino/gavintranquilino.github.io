import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // No longer using regular Link for these
import { HashLink } from 'react-router-hash-link'; // Import HashLink

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Or load from localStorage
  const [showToTopButton, setShowToTopButton] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleScroll = () => {
    if (window.pageYOffset > 300) { // Show button after scrolling 300px
      setShowToTopButton(true);
    } else {
      setShowToTopButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    // Cleanup function to remove the class if the component unmounts while nav is open
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [isNavOpen]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    // Optionally, save preference to localStorage here
    // return () => { // Not strictly necessary to remove dark-theme on unmount unless specific reason
    //   document.body.classList.remove('dark-theme');
    // };
  }, [isDarkMode]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <header>
      {/* Content from your existing header will go here */}
      <div className="logo">
        {/* <img src="/img/logo.png" alt="Logo" /> */}
      </div>
      <button className="nav-toggle" aria-label="toggle navigation" onClick={toggleNav}>
        <span className="hamburger"></span>
      </button>
      <button className="theme-toggle" aria-label="toggle theme" onClick={toggleTheme}>
        <span className="sun-moon">
          {isDarkMode ? <i className="fas fa-moon"></i> : <i className="fas fa-cloud-sun"></i>}
        </span>
      </button>
      
      {showToTopButton && (
        <button onClick={scrollToTop} className="to-top" aria-label="Scroll to top">
          <span className="up-arrow"></span>
        </button>
      )}

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <HashLink smooth to="/#home" className="nav__link" onClick={() => setIsNavOpen(false)}>Home</HashLink>
          </li>
          <li className="nav__item">
            <HashLink smooth to="/#about" className="nav__link" onClick={() => setIsNavOpen(false)}>About Me</HashLink>
          </li>
          <li className="nav__item">
            <HashLink smooth to="/#work" className="nav__link" onClick={() => setIsNavOpen(false)}>My Work</HashLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 