import moment from 'moment';
import employeeValidator from '../validations/employeeValidator';
import Database from '../database/index';

const db = new Database();

const EmployeeController = async (req, res) => {
  const { error } = employeeValidator.validation(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message.split('"').join(''),
    });
  }

  try {
    const checkEmail = req.body.email;
    const checkNationalID = req.body.nationalID;
    const checkPhoneNumber = req.body.phoneNumber;

    const { rowCount } = await db.query('SELECT email, nationalID, phoneNumber FROM employees WHERE email = $1 OR nationalID = $2 OR phoneNumber = $3', [checkEmail, checkNationalID, checkPhoneNumber]);

    if (rowCount) {
      return res.status(409).json({
        status: 409,
        error: 'Either email, NID or Phone provided is in use, pls check again',
      });
    }

    const created_on = moment().format('LL');
    const insert = 'INSERT INTO employees (employeeName, nationalID, phoneNumber, email, dateOfBirth, status, position, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *';
    const newUser = [
      req.body.employeeName,
      req.body.nationalID,
      req.body.phoneNumber,
      req.body.email,
      req.body.dateOfBirth,
      req.body.status,
      req.body.position,
      created_on
    ];
    const { rows } = await db.query(insert, newUser);
    if (!rows) return res.status(500).json('Oops! Something went wrong');
    return res.status(201).json({
      status: 201,
      message: 'An employee was registered successfully',
      data: {
        EmployeeInfo: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
    return console.log(err);
  }
};


export default EmployeeController;
