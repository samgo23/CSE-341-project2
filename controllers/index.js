const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllEmployees = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection('employee')
    .find();
    result.toArray().then((err, list) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(list);
    });
};

const getEmployeeById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Must use a valid employee ID number.' });
    return;
  }

  const employeeId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('employee')
    .find({ _id: employeeId })
    .toArray();

  if (result.length === 0) {
    res.status(404).json({ error: 'Employee not found.' });
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result[0]);
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
    res.status(500).json({ error: 'Unable to create employee.' });
  }
};

const updateEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Must use a valid employee ID number.' });
    return;
  }

  const userId = new ObjectId(req.params.id);
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    startDate: req.body.startDate,
    title: req.body.title
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection('employee')
    .replaceOne({ _id: userId }, employee);

  if (response.modifiedCount > 0) {
    const updatedFields = {};
    for (const [key, value] of Object.entries(employee)) {
      if (value !== undefined) {
        updatedFields[key] = value;
      }
    }
    res.status(200).json({ updatedFields });
  } else {
    res.status(404).json({ error: 'Employee not found.' });
  }
};

const removeEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Must use a valid employee ID number.' });
    return;
  }

  const userId = new ObjectId(req.params.id);
  const deletedEmployee = await mongodb
    .getDb()
    .db()
    .collection('employee')
    .findOne({ _id: userId });

  if (deletedEmployee) {
    const { _id, firstName, lastName } = deletedEmployee;
    const response = await mongodb.getDb().db().collection('employee').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Employee deleted', employee: { _id, firstName, lastName } });
    } else {
      res.status(500).json({ error: 'Error occurred while deleting the employee.' });
    }
  } else {
    res.status(404).json({ error: 'Employee not found.' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  removeEmployee
};
