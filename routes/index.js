const express = require('express');
const router = express.Router();

const swaggerRouter = require('./swagger');
const employeeRouter = require('./employee');
const ticketRouter = require('./ticket');
const authRouter = require('./auth');

router.use('/swagger', swaggerRouter);
router.use('/employee', employeeRouter);
router.use('/ticket', ticketRouter);
router.use('/auth', authRouter);

module.exports = router;

