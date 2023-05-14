const validator = require('../helper/validate');

const validEmployeeData = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|string|email',
    startDate: 'required|string',
    title: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        sucess: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


const validTicketData = (req, res, next) => {
  const validationRule = {
    subject: 'required|string',
    description: 'required|string',
    status: 'required|string',
    priority: 'required|string',
    created_at: 'required|string',
    created_by: 'string',
    assigned_to: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      // Check if the user is logged in
      if (!req.session.user || !req.session.user.created_by) {
        res.status(401).send({
          success: false,
          message: 'Please log in to create a ticket'
        });
      } else {
        next();
      }
    }
  });
};






module.exports = { validEmployeeData, validTicketData };
