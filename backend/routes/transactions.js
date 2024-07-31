const express = require('express');
const transactions = require('../controller/transactionController');
const router = express.Router();

router.get('/', transactions );

module.exports = router;
