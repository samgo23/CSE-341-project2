const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllTickets = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('ticket').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTicketById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Must use a valid ticket ID number.' });
    return;
  }

  const ticketId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().collection('ticket').find({ _id: ticketId }).toArray();

  if (result.length === 0) {
    res.status(404).json({ error: 'Ticket not found.' });
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result[0]);
};

const createTicket = async (req, res) => {
  const currentDate = new Date();

  const ticket = {
    subject: req.body.subject,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    created_at: currentDate.toISOString(),
    //created_by: req.session.user.created_by,
    assigned_to: req.body.assigned_to
  };

  const response = await mongodb.getDb().collection('ticket').insertOne(ticket);

  if (response.acknowledged) {
    res.status(201).json({ id: response.insertedId });
  } else {
    res.status(500).json({ error: 'Unable to create ticket.' });
  }
};

const updateTicket = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Must use a valid ticket ID number.' });
    return;
  }
  const ticketId = new ObjectId(req.params.id);

  const ticket = {
    description: req.body.description,
    priority: req.body.priority,
    assigned_to: req.body.assigned_to
  };

  const currentDate = new Date();
  const ticketUpdate = { $set: { last_updated: currentDate.toISOString() } };

  const response = await mongodb
    .getDb()
    
    .collection('ticket')
    .updateOne({ _id: ticketId }, ticketUpdate);

  if (response.modifiedCount > 0) {
    const updatedFields = {};
    for (const [key, value] of Object.entries(ticket)) {
      if (value !== null) {
        updatedFields[key] = value;
      }
    }
    res.status(200).json(updatedFields);
  } else {
    res.status(500).json({ error: 'Unable to update ticket.' });
  }
};

const deleteTicket = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Must use a valid ticket ID number.' });
    return;
  }

  const ticketId = new ObjectId(req.params.id);
  const deletedTicket = await mongodb.getDb().collection('ticket').findOne({ _id: ticketId });

  if (deletedTicket) {
    const { _id, created_at, created_by } = deletedTicket;
    const response = await mongodb.getDb().collection('ticket').deleteOne({ _id: ticketId });

    if (response.deletedCount > 0) {
      res.status(200).json({ _id, created_at, created_by });
    } else {
      res.status(500).json({ error: 'Unable to delete ticket.' });
    }
  } else {
    res.status(404).json({ error: 'Ticket not found.' });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};
