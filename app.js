const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/school'); // Import your routes file
const cors = require('cors');
const flash = require('connect-flash');

app.use(cors({
  origin: 'https://school-api-frontend.onrender.com',  // Frontend is on port 5001
  methods: ['GET', 'POST'],
}));
app.use(flash());



// Use the middleware to parse incoming JSON requests
app.use(bodyParser.json());

// If your route is prefixed with '/api', ensure you're hitting the correct URL in Postman
app.use('/api', schoolRoutes); // Prefix for your routes, if applicable

app.use((req, res, next) => {
  console.log(`🔍 ${req.method} ${req.url}`);
  next();
});


const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}`));



// Global error handler (add this at the bottom of app.js)
// Error handler (ensure it's at the end of your route definitions)
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);  // Logs the error for debugging
  const statusCode = err.statusCode || 500;  // Default to 500 if no status code is provided
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ error: message });
});
