import ENV from 'dotenv';
import managerValidator from '../validations/managerValidator';
import Database from '../database/index';

const db = new Database();
ENV.config();

const EmployeeController = async (req, res) => {
  // const { error } = managerValidator.validation(req.body);

  // if (error) {
  //   return res.status(400).json({
  //     status: 400,
  //     error: error.details[0].message.split('"').join(''),
  //   });
  // }

  try {
    const checkEmail = req.body.email;
    const { rowCount } = await db.query('SELECT email FROM employees WHERE email = $1', [checkEmail]);

    if (rowCount) {
      return res.status(409).json({
        status: 409,
        error: ' An email provided is in use',
      });
    }

    const insert = 'INSERT INTO employees (employeeName, nationalID, phoneNumber, email, dateOfBirth, status, position) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *';
    const newUser = [
      req.body.employeeName,
      req.body.nationalID,
      req.body.phoneNumber,
      req.body.email,
      req.body.dateOfBirth,
      req.body.status,
      req.body.position,
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
