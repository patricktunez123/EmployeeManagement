import moment from 'moment';
import employeeValidator from '../validations/employeeValidator';
import Database from '../database/index';
import notification from '../notifications/notify';

const db = new Database();

 class EmployeeController {
  async store(req, res) {
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
      const message = 'You have been registered at Awesomity Lab as their employee, congz!';
      if (rows) {
        notification.Notify(rows[0], message);
        return res.status(201).json({
          status: 201,
          message: 'An employee was registered successfully',
          data: {
            EmployeeInfo: rows[0],
          },
        });
      }
      
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
      return console.log(err);
    }
  };

  async activate(req, res) {
    try {
    const { rows } = await db.query('SELECT id FROM employees');
    const employee = rows.find((emp) => emp.id === parseInt(req.params.id, 10));

    if (!employee) {
      return res.status(404).json({
        status: 404,
        error: 'Employee not found',
      });
    }

    if (employee) {
        const id = req.params.id;
        const employeeId = [
          'active',
          id,
        ];
      const query = 'UPDATE employees SET  status=$1 WHERE id=$2 returning *';
      const { rows } = await db.query(query, employeeId);
      return res.status(200).json({
        status: 200,
        message: 'Employee has been successfully activated',
        UserInfo: rows[0],
      });
    }
  } catch (err) {
      res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
      return console.log(err);
  }
};

async delete(req, res) {
  try {
    const { rows } = await db.query('SELECT id FROM employees');
    const employee = rows.find((emp) => emp.id === parseInt(req.params.id, 10));
    if (!employee) {
      return res.status(404).json({
        status: 404,
        error: 'Employee not found',
      });
    }
    
    if (employee) {
      const id = req.params.id;
      await db.query('DELETE FROM employees WHERE id = $1', [id]);
      return res.status(200).json({
      status: 200,
      message: 'Employee deleted successfully'
    });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

async edit(req, res) {
  const { error } = employeeValidator.validation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.split('"').join(''),
      });
    }
    try {
    const checkEmail = req.body.email;
    const { rowCount } = await db.query('SELECT email FROM employees WHERE email = $1', [checkEmail]);

    if (rowCount) {
      return res.status(409).json({
        status: 409,
        error: ' An email provided is in use',
      });
    }
    const { rows } = await db.query('SELECT id FROM employees');
    const employee = rows.find((emp) => emp.id === parseInt(req.params.id, 10));

    if (!employee) {
      return res.status(404).json({
        status: 404,
        error: 'Employee not found',
      });
    }

    if (employee) {
        const id = req.params.id;
        const employee = [
          req.body.employeeName,
          req.body.nationalID,
          req.body.phoneNumber,
          req.body.email,
          req.body.dateOfBirth,
          req.body.status,
          req.body.position,
          id,
        ];
      const query = 'UPDATE employees SET employeeName=$1, nationalID=$2, phoneNumber=$3, email=$4, dateOfBirth=$5, status=$6, position=$7 WHERE id=$8 returning *';
      const { rows } = await db.query(query, employee);
      return res.status(200).json({
        status: 200,
        message: 'Employe Updated Successfully',
        UserInfo: rows[0],
      });
    }
  } catch (err) {
      res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
      return console.log(err);
  }
};

async search(req, res) {
  try {
      const searchQueries = [
        req.body.employeeName,
        req.body.phoneNumber,
        req.body.email,
        req.body.position,
      ];
    const query = 'SELECT * FROM employees WHERE employeeName=$1 OR phoneNumber=$2 OR email=$3 OR position=$4';
    const { rowCount } = await db.query(query, searchQueries);
    const { rows } = await db.query(query, searchQueries);
    if(!rowCount) {
      return res.status(404).json({
      status: 404,
      Message: 'No matching data found',
      });
    }
    return res.status(200).json({
      status: 200,
      Results: rows,
    });
} catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
    return console.log(err);
}
};

async suspend(req, res) {
  try {
  const { rows } = await db.query('SELECT id FROM employees');
  const employee = rows.find((emp) => emp.id === parseInt(req.params.id, 10));

  if (!employee) {
    return res.status(404).json({
      status: 404,
      error: 'Employee not found',
    });
  }

  if (employee) {
      const id = req.params.id;
      const employeeId = [
        'inactive',
        id,
      ];
    const query = 'UPDATE employees SET  status=$1 WHERE id=$2 returning *';
    const { rows } = await db.query(query, employeeId);
    return res.status(200).json({
      status: 200,
      message: 'Employee has been successfully suspended',
      UserInfo: rows[0],
    });
  }
} catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
    return console.log(err);
  }
};
}

export default new EmployeeController();
