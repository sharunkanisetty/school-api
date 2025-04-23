import React, { useState } from 'react';
import api from '../api';  // Ensure you're importing api.js correctly

const AddSchool = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: ''
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    address: false,
    latitude: false,
    longitude: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Reset error for the field being updated
    setErrors({
      ...errors,
      [name]: false
    });
  };

  // Validate form only on submit
  const validateForm = () => {
    const nameTrimmed = formData.name.trim();
    const nameStartsWithNumber = /^\d/.test(nameTrimmed);
    const nameIsOnlyNumbers = /^\d+$/.test(nameTrimmed);
  
    const newErrors = {
      name: !nameTrimmed || nameStartsWithNumber || nameIsOnlyNumbers,
      address: !formData.address.trim(),
      latitude: isNaN(formData.latitude) || formData.latitude.trim() === '',
      longitude: isNaN(formData.longitude) || formData.longitude.trim() === ''
    };
  
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!validateForm()) {
      setMessage('❌ Please fill out all fields correctly.'); // Show message on form validation failure
      return;
    }

    // If validation passes, try submitting data to the backend
    try {
      const response = await api.post('/addSchool', formData);
      console.log('✅ School added:', response.data);
      setMessage('✅ School added successfully!');
      setFormData({ name: '', address: '', latitude: '', longitude: '' }); // Clear form on success
    } catch (err) {
      console.error('❌ Error adding school:', err);
      setMessage(`❌ ${err?.response?.data?.error || 'Failed to add school'}`);
    }
  };

  // Styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f4f9',
      padding: '20px',
    },
    formContainer: {
      width: '100%',
      maxWidth: '600px',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    inputContainer: {
      marginBottom: '15px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    label: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '5px',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      outline: 'none',
    },
    errorText: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%',
      marginTop: '20px',
    },
    successMessage: {
      color: 'green',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '20px',
    },
    errorMessage: {
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Add New School</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>School Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: errors.name ? 'red' : '#ccc',
              }}
            />
            {errors.name && (
  <p style={styles.errorText}>
    School name is required and must not start with a number or be only numbers.
  </p>
)}

          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: errors.address ? 'red' : '#ccc',
              }}
            />
            {errors.address && <p style={styles.errorText}>Please enter an address.</p>}
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Latitude:</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: errors.latitude ? 'red' : '#ccc',
              }}
            />
            {errors.latitude && <p style={styles.errorText}>Please enter a valid latitude.</p>}
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Longitude:</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: errors.longitude ? 'red' : '#ccc',
              }}
            />
            {errors.longitude && <p style={styles.errorText}>Please enter a valid longitude.</p>}
          </div>
          <button type="submit" style={styles.button}>Add School</button>
        </form>
        {message && <p style={message.includes('successfully') ? styles.successMessage : styles.errorMessage}>{message}</p>}
      </div>
    </div>
  );
};

export default AddSchool;
