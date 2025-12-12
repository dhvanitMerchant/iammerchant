const express = require('express');
const app = express();

const pageRoutes = require('./routes/pages');

// Register middlewares here if needed
// e.g., body-parser, static folders, sessions, flash, etc.

// Registering routes
app.use('/', pageRoutes);

// Export the app
module.exports = app;
