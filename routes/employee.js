const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/');
const validation = require('../middleware/validation-middleware');
/* HTTP REQUESTS */

// GET ALL EMPLOYEES
router.get('/', employeeController.getAllEmployees);

// GET EMPLOYEE BY ID
router.get('/:id', employeeController.getEmployeeById);

// CREATE EMPLOYEE
router.post('/', validation.validEmployeeData, employeeController.createEmployee);

// UPDATE EMPLOYEE
router.put('/:id', validation.validEmployeeData, employeeController.updateEmployee);

// DELETE EMPLOYEE
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
