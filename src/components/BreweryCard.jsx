import React from 'react';
import { Link } from 'react-router-dom';

const BreweryCard = ({ brewery }) => {
  const getTypeIcon = (type) => {
    const icons = {
      micro: '🔬',
      nano: '🧪',
      regional: '🏭',
      brewpub: '🍻',
      large: '🏢',
      planning: '📋',
      contract: '📝',
      proprietor: '👤',
      closed: '❌'
    };
    return icons[type] || '🏭';
  };

  return (
    <Link to={`/brewery/${brewery.id}`} className="brewery-card-link">
      <div className="brewery-card">
        <div className="card-header">
          <span className="type-icon">
            {getTypeIcon(brewery.brewery_type)}
          </span>
          <h3 className="brewery-name">{brewery.name}</h3>
        </div>
        
        <div className="card-body">
          <div className="brewery-info">
            <p className="brewery-type">
              <strong>Type:</strong> {brewery.brewery_type || 'Unknown'}
            </p>
            <p className="brewery-address">
              <strong>Location:</strong> {brewery.city}, {brewery.state} {brewery.postal_code}
            </p>
            {brewery.website_url && (
              <p className="brewery-website">
                <strong>Website:</strong>{' '}
                <a 
                  href={brewery.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Site
                </a>
              </p>
            )}
            {brewery.phone && (
              <p className="brewery-phone">
                <strong>Phone:</strong> {brewery.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BreweryCard;