import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreweryDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch brewery details');
        }
        
        const data = await response.json();
        setBrewery(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweryDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading brewery details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!brewery) return <div className="error">Brewery not found</div>;

  return (
    <div className="brewery-detail">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      
      <div className="detail-card">
        <div className="detail-header">
          <h1>{brewery.name}</h1>
          <span className="brewery-type-badge">{brewery.brewery_type}</span>
        </div>
        
        <div className="detail-content">
          <div className="detail-section">
            <h3>📍 Location Information</h3>
            <p><strong>Address:</strong> {brewery.street || 'N/A'}, {brewery.city}, {brewery.state} {brewery.postal_code}</p>
            <p><strong>Country:</strong> {brewery.country || 'United States'}</p>
            <p><strong>Coordinates:</strong> {brewery.latitude && brewery.longitude ? 
              `${brewery.latitude}, ${brewery.longitude}` : 'N/A'}</p>
          </div>

          <div className="detail-section">
            <h3>📞 Contact Information</h3>
            <p><strong>Phone:</strong> {brewery.phone || 'N/A'}</p>
            <p><strong>Website:</strong> {brewery.website_url ? 
              <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
                {brewery.website_url}
              </a> : 'N/A'}
            </p>
          </div>

          <div className="detail-section">
            <h3>🏢 Brewery Details</h3>
            <p><strong>Type:</strong> {brewery.brewery_type || 'N/A'}</p>
            <p><strong>ID:</strong> {brewery.id}</p>
            <p><strong>Last Updated:</strong> {brewery.updated_at ? 
              new Date(brewery.updated_at).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreweryDetail;