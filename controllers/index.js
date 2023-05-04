const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllEmployees = async (req, res) => {
  const result = await mongodb.getDb().db().collection('employee').find();
  result
    .toArray()
    .then((list) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getEmployeeById = async (req, res) => {
  const employeeId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('employee').find({ _id: employeeId });
  result
    .toArray()
    .then((list) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(list[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const createEmployee = async (req, res) => {
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    startDate: req.body.startDate,
    title: req.body.title
  };
  const response = await mongodb.getDb().db().collection('employee').insertOne(employee);
  if (response.acknowledged) {
    res.status(201).json({ id: response.insertedId });
  } else {
    res.status(500).json({ error: 'Unable to create employee' });
  }
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee };
