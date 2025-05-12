import React from 'react';
import { Link } from 'react-router-dom';

interface PortfolioItemProps {
  id: string; // Project ID for constructing the route
  imageUrl: string;
  altText: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ id, imageUrl, altText }) => {
  return (
    <Link to={`/project/${id}`} className="portfolio__item">
      <img 
        src={imageUrl} 
        alt={altText} 
        className="portfolio__img" 
        loading="lazy" 
      />
    </Link>
  );
};

export default PortfolioItem; 