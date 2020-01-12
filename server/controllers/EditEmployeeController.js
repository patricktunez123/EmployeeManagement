import employeeValidator from '../validations/employeeValidator';
import Database from '../database/index';

const db = new Database();

const EditEmployeeController = async (req, res) => {
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

export default EditEmployeeController;
