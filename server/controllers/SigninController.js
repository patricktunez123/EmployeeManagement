import ENV from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from '../database/index';

const db = new Database();
ENV.config();

const managerLogin = async (req, res) => {
  try {
    const managerEmail = req.body.email;
    const managerPassword = req.body.password;
    const { rows } = await db.query('SELECT * FROM managers WHERE email = $1', [managerEmail]);
    if (!rows[0]) {
      return res.status(401).json({
        status: 401,
        error: 'Incorrect email or password',

      });
    }
    const checkPassword = await bcrypt.compare(managerPassword.trim(), rows[0].password);
    if (!checkPassword) {
      return res.status(401).json({
        status: 401,
        error: 'Incorrect email or password',

      });
    }

    const loginPayload = {
      email: rows[0].email,
      phoneNumber: rows[0].phoneNumber,
    };

    const token = await jwt.sign(loginPayload, process.env.JWT_KEY, { expiresIn: '365d' });

    return res.status(200).json({
      status: 200,
      message: 'You are successfully logged in',
      data: {
        token,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return {};
};

export default managerLogin;
