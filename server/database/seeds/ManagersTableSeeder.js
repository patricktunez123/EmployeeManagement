import Database from '../index';

const db = new Database();

const insertInitials = `INSERT INTO managers
(
  employeeName,
  nationalID, 
  phoneNumber,
  email,
  dateOfBirth,
  status,
  position,
  password
)
VALUES 
(
  'Patrick Tunezerwane', 
  '1199934678924362', 
  '0781429268',
  'pazo20@gmail.com',
  '01.01.1999',
  'active',
  'manager',
  '@12345@23'
)
`;
const signedUp = db.query(insertInitials);

if (signedUp) console.log('Managers table was seeded successfully');
