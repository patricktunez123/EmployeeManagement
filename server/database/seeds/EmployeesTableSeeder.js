import Database from '../index';

const db = new Database();

const insertInitials = `INSERT INTO employees
(
  employeeName,
  nationalID, 
  phoneNumber,
  email,
  dateOfBirth,
  status,
  position
)
VALUES 
(
  'PPatrick Tunez 3', 
  '3472472747274727', 
  '0781429268',
  'patric3@gmail.com',
  '01.01.1999',
  'inactive',
  'designer'
)
`;
const inserted = db.query(insertInitials);

if (inserted) console.log('Employees table was seeded successfully');
