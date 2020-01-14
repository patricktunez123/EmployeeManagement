import bcrypt from 'bcrypt';
import ENV from 'dotenv';
import moment from 'moment';
import managerValidator from '../validations/managerValidator';
import tokenHelper from '../helpers/tokenHelper';
import Database from '../database/index';

const db = new Database();
ENV.config();

const SignupController = async (req, res) => {
  const { error } = managerValidator.validation(req.body);

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

    const { rowCount } = await db.query('SELECT email, nationalID, phoneNumber FROM managers WHERE email = $1 OR nationalID = $2 OR phoneNumber = $3', [checkEmail, checkNationalID, checkPhoneNumber]);

    if (rowCount) {
      return res.status(409).json({
        status: 409,
        error: ' Either email, NID or Phone provided is already taken, pls check again',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const position = 'Manager'
    const created_on = moment().format('LL');
    const insert = 'INSERT INTO managers (employeeName, nationalID, phoneNumber, email, dateOfBirth, status, position, password, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
    const newUser = [
      req.body.employeeName,
      req.body.nationalID,
      req.body.phoneNumber,
      req.body.email,
      req.body.dateOfBirth,
      req.body.status,
      position,
      password,
      created_on
    ];
    const { rows } = await db.query(insert, newUser);
    if (!rows) return res.status(500).json('Oops! Something went wrong');
    const token = tokenHelper.genToken(rows[0]);
    return res.status(201).json({
      status: 201,
      message: 'You have successfully signed up',
      data: {
        Token: token,
        user: rows[0],
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


export default SignupController;
