import Database from '../database/index';

const db = new Database();

const SuspendEmployeeController = async (req, res) => {
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

export default SuspendEmployeeController;
