import React, { useState, useEffect } from 'react';
import api from '../api'; // Assuming api.js is set up correctly

const ListSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [latitudeFilter, setLatitudeFilter] = useState('');
  const [longitudeFilter, setLongitudeFilter] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await api.get('/listSchools'); // Make sure API is correct
        if (response.data && response.data.data) {
          setSchools(response.data.data); // Correctly handling data
        } else {
          setError('No schools found');
        }
      } catch (error) {
        console.error('Failed to fetch schools', error);
        setError('Failed to fetch schools');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Haversine formula to calculate distance between two lat/long points (in kilometers)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleFilter = () => {
    // Check if both latitude and longitude filters are set
    if (latitudeFilter && longitudeFilter) {
      const sortedSchools = [...schools].sort((a, b) => {
        const distanceA = calculateDistance(
          latitudeFilter,
          longitudeFilter,
          a.latitude,
          a.longitude
        );
        const distanceB = calculateDistance(
          latitudeFilter,
          longitudeFilter,
          b.latitude,
          b.longitude
        );
        return distanceA - distanceB; // Sorting in ascending order of distance
      });
      setSchools(sortedSchools); // Set the sorted list
    }
  };

  const handleLatitudeChange = (e) => setLatitudeFilter(e.target.value);
  const handleLongitudeChange = (e) => setLongitudeFilter(e.target.value);

  if (loading) {
    return <p style={styles.centeredText}>Loading...</p>;
  }

  if (error) {
    return <p style={styles.centeredText}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>School List</h1>

      {/* Search bar */}
      <div style={styles.filterContainer}>
        <input
          type="number"
          placeholder="Filter by Latitude"
          value={latitudeFilter}
          onChange={handleLatitudeChange}
          style={styles.filterInput}
        />
        <input
          type="number"
          placeholder="Filter by Longitude"
          value={longitudeFilter}
          onChange={handleLongitudeChange}
          style={styles.filterInput}
        />
        <button onClick={handleFilter} style={styles.filterButton}>
          Filter
        </button>
      </div>

      <div style={styles.listContainer}>
        {schools.length > 0 ? (
          <ul style={styles.ul}>
            {schools.map((school) => (
              <li key={school.id} style={styles.listItem}>
                <div style={styles.schoolInfo}>
                  <div>
                    <strong>{school.name}</strong> - {school.address}
                  </div>
                  <div style={styles.coordinates}>
                    Latitude: {school.latitude}, Longitude: {school.longitude}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noSchoolsMessage}>No schools available</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f4f7fc',
    fontFamily: '"Roboto", sans-serif',
    overflow: 'auto',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  filterInput: {
    padding: '12px',
    fontSize: '1rem',
    width: '200px',
    maxWidth: '200px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  filterButton: {
    padding: '12px 20px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  listContainer: {
    width: '80%',
    maxWidth: '1500px', // Increased width of the list container
    marginTop: '20px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
    maxHeight: '75vh',
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '15px',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  schoolInfo: {
    display: 'flex',
    justifyContent: 'space-between', // Space out name/address and coordinates
    alignItems: 'center',
    gap: '15px',
  },
  coordinates: {
    fontSize: '1rem',
    color: '#888',
  },
  noSchoolsMessage: {
    fontSize: '1.2rem',
    color: '#999',
    textAlign: 'center',
  },
  centeredText: {
    textAlign: 'center',
    fontSize: '1.5rem',
  },
};

export default ListSchools;
