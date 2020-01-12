import Database from '../database/index';

const db = new Database();

const SearchEmployeeController = async (req, res) => {
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

export default SearchEmployeeController;
