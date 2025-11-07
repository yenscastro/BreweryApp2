import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartsComponent = ({ breweries }) => {
  // Chart 1: Brewery Types Distribution
  const typeData = Object.entries(
    breweries.reduce((acc, brewery) => {
      const type = brewery.brewery_type || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Chart 2: Top States by Brewery Count
  const stateData = Object.entries(
    breweries.reduce((acc, brewery) => {
      const state = brewery.state || 'Unknown';
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  const COLORS = [
    'rgb(0, 136, 254)',    // Blue
    'rgb(0, 196, 159)',    // Teal
    'rgb(255, 187, 40)',   // Yellow
    'rgb(255, 128, 66)',   // Orange
    'rgb(136, 132, 216)',  // Purple
    'rgb(130, 202, 157)'   // Green
  ];

  return (
    <div className="charts-section">
      <h2>📊 Brewery Analytics</h2>
      
      <div className="charts-grid">
        {/* Pie Chart - Brewery Types */}
        <div className="chart-container">
          <h3>Brewery Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="rgb(136, 132, 216)"
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Top States */}
        <div className="chart-container">
          <h3>Top 10 States by Brewery Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                stroke="rgb(255, 255, 255)"
              />
              <YAxis stroke="rgb(255, 255, 255)" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="rgb(255, 215, 0)" name="Number of Breweries" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsComponent;