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
    created_by: 'required|string',
    assigned_to: 'required|string'
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

module.exports = { validEmployeeData, validTicketData };
