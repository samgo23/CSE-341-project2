const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticket');
const validation = require('../middleware/validation-middleware');
const { isAuthenticated } = require('../middleware/authentication');

// GET ALL TICKETS
router.get('/', ticketController.getAllTickets);

// GET TICKET BY ID
router.get('/:id', ticketController.getTicketById);

// CREATE TICKET
router.post('/', isAuthenticated, validation.validTicketData, ticketController.createTicket);

// UPDATE TICKET
router.put('/:id', isAuthenticated, validation.validTicketData, ticketController.updateTicket);

// DELETE TICKET
router.delete('/:id', isAuthenticated, ticketController.deleteTicket);

module.exports = router;