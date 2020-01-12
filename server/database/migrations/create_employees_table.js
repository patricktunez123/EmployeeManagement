import Database from '../index.js';

const db = new Database();
class CreateEmployeesTable {
  static up() {
    return `CREATE TABLE IF NOT EXISTS employees (
      id serial PRIMARY KEY, 
      employeeName varchar(100), 
      nationalID varchar(100), 
      phoneNumber varchar(100),
      email varchar(100),
      dateOfBirth varchar(100),
      status varchar(100),
      position varchar(100),
      created_on timestamp);
      `;
  }

  static down() {
    return 'DROP TABLE IF EXISTS employees;';
  }

  static async run() {
    await db.query(CreateEmployeesTable.down());
    await db.query(CreateEmployeesTable.up());
  }
}

export default CreateEmployeesTable;
