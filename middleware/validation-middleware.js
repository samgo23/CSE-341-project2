const validator = require('../helper/validate');
const validEmployeeData = async (req, res, next) => {
    const validationRule = {
    "firstName": "required|string",
    "lastName": "required|string",
    "email": "required|string|email",
    "startDate": "required|date",
    "title": "required|string"
    };

    await validator(red.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                sucess: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    }).catch(err => console.log(err))
};

module.exports = validEmployeeData;
