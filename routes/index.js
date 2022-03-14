const router = require('express').Router();
const path = require('path');
const isAuthenticated = require('../config/middleware/auth');

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Send every other request to the React app
// Define any API routes before this runs
router.get("*", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;