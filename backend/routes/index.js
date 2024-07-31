const express = require('express');
const router = express.Router();

// Define routes
router.use('/transactions', require('./transactions'));
router.use('/statistics', require('./statistics'));
router.use('/bar_chart', require('./barChart'));
router.use('/pie_chart', require('./pieChart'));
router.use('/combined', require('./combined'));

module.exports = router;