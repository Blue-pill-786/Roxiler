const express = require('express');
const router = express.Router();

const statistics = require('../controller/statisticsController');

router.get('/', statistics);

module.exports = router;
