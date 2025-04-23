const express = require('express');
const router = express.Router();
const db = require('../db'); // MySQL connection pool
const haversine = require('../utils/haversine'); // Make sure this file exists
const wrapAsync = require('../utils/wrapAsync');

// Add a new school
router.post('/addSchool', wrapAsync(async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  console.log('Received data:', req.body);

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check for duplicate school based on name and address
  const [existing] = await db.execute(
    'SELECT * FROM schools WHERE name = ? AND address = ?',
    [name, address]
  );

  if (existing.length > 0) {
    return res.status(409).json({ error: 'School with the same name and address already exists' });
  }

  const [result] = await db.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude]
  );

  console.log('Database insert result:', result);

  if (result && result.insertId !== undefined) {
    return res.status(201).json({ message: 'School added successfully', id: result.insertId });
  } else {
    return res.status(500).json({ message: 'School added, but insertId not found', id: null });
  }
}));


// List schools, sorted by proximity if lat/lng are provided
router.get('/listSchools', wrapAsync(async (req, res) => {
  const { latitude, longitude } = req.query;

  const [schools] = await db.execute('SELECT * FROM schools');

  // Log fetched schools for debugging
  console.log('Fetched schools:', schools);

  if (!schools || schools.length === 0) {
    return res.status(200).json({ message: 'No schools added yet', data: [] });
  }

  if (latitude && longitude) {
    const sorted = schools.map(school => ({
      ...school,
      distance: haversine(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude
      )
    })).sort((a, b) => a.distance - b.distance);

    return res.json({ message: 'Schools sorted by distance', data: sorted });
  }

  return res.json({ message: 'All schools', data: schools });
}));

module.exports = router;
