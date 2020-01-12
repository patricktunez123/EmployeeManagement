import Database from '../index.js';

const db = new Database();
class CreateManagersTable {
  static up() {
    return `CREATE TABLE IF NOT EXISTS managers (
      id serial PRIMARY KEY, 
      employeeName varchar(100), 
      nationalID varchar(100), 
      phoneNumber varchar(100),
      email varchar(100),
      dateOfBirth varchar(100),
      status varchar(100),
      position varchar(100),
      password varchar(100),
      created_on timestamp);
      `;
  }

  static down() {
    return 'DROP TABLE IF EXISTS managers;';
  }

  static async run() {
    await db.query(CreateManagersTable.down());
    await db.query(CreateManagersTable.up());
  }
}

export default CreateManagersTable;
