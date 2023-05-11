const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.use('/employee', require('./employee'));
router.use('/auth', require('./auth'));

module.exports = router;
