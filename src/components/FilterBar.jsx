import React, { useState } from 'react';

const FilterBar = ({ breweries, onFilter }) => {
  const [filters, setFilters] = useState({
    breweryType: 'all',
    state: 'all'
  });

  // Get unique brewery types and states
  const breweryTypes = [...new Set(breweries.map(b => b.brewery_type).filter(Boolean))];
  const states = [...new Set(breweries.map(b => b.state).filter(Boolean))].sort();

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="brewery-type">Brewery Type:</label>
        <select
          id="brewery-type"
          value={filters.breweryType}
          onChange={(e) => handleFilterChange('breweryType', e.target.value)}
        >
          <option value="all">All Types</option>
          {breweryTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="state">State:</label>
        <select
          id="state"
          value={filters.state}
          onChange={(e) => handleFilterChange('state', e.target.value)}
        >
          <option value="all">All States</option>
          {states.map(state => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <button 
        className="clear-filters"
        onClick={() => {
          setFilters({ breweryType: 'all', state: 'all' });
          onFilter({ breweryType: 'all', state: 'all' });
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;