const express = require('express');

const router = express.Router();

router.use('/', require('./swagger'));

router.use('/employee', require('./employee'));
router.use('/ticket', require('./ticket'));
router.use('/auth', require('./auth'));

module.exports = router;
