import Database from '../database/index';

const db = new Database();

const DeleteEmployeeController = async (req, res) => {
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

export default DeleteEmployeeController;
