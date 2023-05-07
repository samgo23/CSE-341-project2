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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Must use a valid employee ID number.' })
  };
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

const updateEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Must use a valid employee ID number.' })
  };
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error);
  }
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
};

const removeEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Must use a valid employee ID number.' })
  };
  try {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
};


module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, removeEmployee };
