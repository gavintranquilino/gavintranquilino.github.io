import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a href="mailto:gtranqui@uwaterloo.ca" className="footer__link">
        gtranqui@uwaterloo.ca
      </a>
      <ul className="social-list">
        <li className="social-list__item">
          <a className="social-list__link" href="https://linkedin.com/in/gavintranquilino/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://github.com/gavintranquilino" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://www.youtube.com/@gavintranquilino" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://stackoverflow.com/users/13495609/guhbean" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-stack-overflow"></i>
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://discord.gg/cZKEPHugRt" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-discord"></i>
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://www.instagram.com/gavin.tranq/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://devpost.com/gavintranquilino" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-dev"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer; 