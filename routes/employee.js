const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/');
const validation = require('../middleware/validation-middleware');
const { isAuthenticated } = require('../middleware/authentication');
/* HTTP REQUESTS */

// GET ALL EMPLOYEES
router.get('/', employeeController.getAllEmployees);

// GET EMPLOYEE BY ID
router.get('/:id', employeeController.getEmployeeById);

// CREATE EMPLOYEE
router.post('/', isAuthenticated, validation.validEmployeeData, employeeController.createEmployee);

// UPDATE EMPLOYEE
router.put(
  '/:id',
  isAuthenticated,
  validation.validEmployeeData,
  employeeController.updateEmployee
);

// DELETE EMPLOYEE
router.delete('/:id', isAuthenticated, employeeController.removeEmployee);

module.exports = router;
