const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/');

/* HTTP REQUESTS */

// GET ALL EMPLOYEES
router.get('/', employeeController.getAllEmployees);

// GET EMPLOYEE BY ID
router.get('/:id', employeeController.getEmployeeById);

// CREATE EMPLOYEE
router.post('/', employeeController.createEmployee);

module.exports = router;
