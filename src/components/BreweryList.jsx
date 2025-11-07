import React from 'react';
import BreweryCard from './BreweryCard';

const BreweryList = ({ breweries }) => {
  if (breweries.length === 0) {
    return (
      <div className="no-results">
        <h3>No breweries found matching your criteria.</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="brewery-list">
      <h2>Breweries ({breweries.length})</h2>
      <div className="breweries-grid">
        {breweries.map(brewery => (
          <BreweryCard key={brewery.id} brewery={brewery} />
        ))}
      </div>
    </div>
  );
};

export default BreweryList;