import React, { useState, useEffect } from 'react';
import BreweryList from './BreweryList';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import StatsCard from './StatsCard';
import ChartsComponent from './ChartsComponent';

const Dashboard = () => {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCharts, setShowCharts] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50');
        
        if (!response.ok) {
          throw new Error('Failed to fetch breweries');
        }
        
        const data = await response.json();
        setBreweries(data);
        setFilteredBreweries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  // Calculate statistics
  const calculateStats = () => {
    const totalBreweries = breweries.length;
    
    // Count by type
    const typeCount = breweries.reduce((acc, brewery) => {
      const type = brewery.brewery_type || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // States count
    const stateCount = breweries.reduce((acc, brewery) => {
      const state = brewery.state || 'Unknown';
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {});

    // Most common state
    const mostCommonState = Object.keys(stateCount).reduce((a, b) => 
      stateCount[a] > stateCount[b] ? a : b, 'Unknown'
    );

    // Average breweries per state
    const statesWithBreweries = Object.keys(stateCount).length;
    const avgPerState = statesWithBreweries > 0 ? 
      (totalBreweries / statesWithBreweries).toFixed(1) : 0;

    return {
      totalBreweries,
      typeCount,
      mostCommonState,
      avgPerState,
      statesCount: statesWithBreweries
    };
  };

  const stats = calculateStats();

  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredBreweries(breweries);
      return;
    }

    const filtered = breweries.filter(brewery =>
      brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (brewery.city && brewery.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (brewery.state && brewery.state.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredBreweries(filtered);
  };

  // Handle filter
  const handleFilter = (filters) => {
    let filtered = [...breweries];

    if (filters.breweryType && filters.breweryType !== 'all') {
      filtered = filtered.filter(brewery => 
        brewery.brewery_type === filters.breweryType
      );
    }

    if (filters.state && filters.state !== 'all') {
      filtered = filtered.filter(brewery => 
        brewery.state === filters.state
      );
    }

    setFilteredBreweries(filtered);
  };

  if (loading) {
    return <div className="loading">Loading breweries...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="stats-section">
        <StatsCard 
          title="Total Breweries" 
          value={stats.totalBreweries} 
          icon="🏭"
        />
        <StatsCard 
          title="States Covered" 
          value={stats.statesCount} 
          icon="🗺️"
        />
        <StatsCard 
          title="Avg per State" 
          value={stats.avgPerState} 
          icon="📊"
        />
        <StatsCard 
          title="Most Common State" 
          value={stats.mostCommonState} 
          icon="⭐"
        />
      </div>

      {/* Toggle for charts visibility */}
      <div className="charts-toggle">
        <button 
          onClick={() => setShowCharts(!showCharts)}
          className="toggle-button"
        >
          {showCharts ? '📊 Hide Charts' : '📊 Show Charts'}
        </button>
      </div>

      {/* Charts Section */}
      {showCharts && <ChartsComponent breweries={breweries} />}

      <div className="controls-section">
        <SearchBar onSearch={handleSearch} />
        <FilterBar 
          breweries={breweries} 
          onFilter={handleFilter} 
        />
      </div>

      <BreweryList breweries={filteredBreweries} />
    </div>
  );
};

export default Dashboard;