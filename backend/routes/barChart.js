const express = require('express');
const barChart = require('../controller/barChartController');
const router = express.Router();


router.get('/', barChart);

module.exports = router;
