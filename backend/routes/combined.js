const express = require('express');
const router = express.Router();
const combined = require('../controller/combinedController');

router.get('/', combined);

module.exports = router;
