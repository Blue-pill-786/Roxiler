const express = require('express');
const router = express.Router();

const pieChart = require('../controller/pieChartController');

router.get('/', pieChart);

module.exports = router;
