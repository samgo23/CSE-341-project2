const e = require('express');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllTickets = async (req, res) => {
    const result = await mongodb
        .getDb()
        .db()
        .collection('ticket')
        .find();
        result.toArray().then((err, list) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        });
    }

const getTicketById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Must use a valid ticket ID number.' });
        return;
    }

    const ticketId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection('ticket')
        .find({ _id: ticketId })
        .toArray();

    if (result.length === 0) {
        res.status(404).json({ error: 'Ticket not found.' });
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
}

const createTicket = async (req, res) => {
    const ticket ={
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        created_at: req.body.created_at,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to
    };

    const response = await mongodb.getDb().db().collection('ticket').insertOne(ticket);

    if (response.acknowledged) {
        res.status(201).json({ id: response.insertedId });
    }
    else {
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
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        created_at: req.body.created_at,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to
    };

    const response = await mongodb.getDb().db().collection('ticket').updateOne({ _id: ticketId }, { $set: ticket });

    if (response.modifiedCount > 0) {
        const updatedFields = {};
        for (const [key, value] of Object.entries(ticket)) {
            if (value !== null) {
                updatedFields[key] = value;
            }
        }
        res.status(200).json(updatedFields);
    }
    else {
        res.status(500).json({ error: 'Unable to update ticket.' });

    }
};

const deleteTicket = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Must use a valid ticket ID number.' });
        return;
    }

    const ticketId = new ObjectId(req.params.id);
    const deletedTicket = await mongodb
        .getDb()
        .db()
        .collection('ticket')
        findOne({ _id: ticketId });

    if (deletedTicket) {
        const {_id, created_at, created_by} = deletedTicket;
        const response = await mongodb
            .getDb()
            .db()
            .collection('ticket')
            deleteOne({ _id: ticketId });
        
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
