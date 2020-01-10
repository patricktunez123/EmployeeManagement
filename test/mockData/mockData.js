const mockData = {
  managerPayload: {
    id: 2,
    name: 'Patrick Tunezerwane',
    nationalID: '1234345612456786',
    phoneNumber: '0781429268',
    dateOfBirth: '01-01-1999',
    status: 'active',
    position: 'Manager ',
    email: 'tp3@gmail.com',
    password: '$2b$10$Atnw/KEDHvmcSdNTRWfMfOZIOOQFOIynwjiYqGGZx3xtemaF6NGe6'
  },
  canLogin: {
    email: 'tp@gmail.com',
    password: '12345',
  },
  incorrectEmail: {
    email: 'patrick@gmail.com',
    password: '12345',
  },
  incorrectPassword: {
    email: 'tp@gmail.com',
    password: 'patKgl',
  },
  incorrectEmailAndPwd: {
    email: 'patrick10@gmail.com',
    password: 'patKgl',
  },
  canSignUp: {
    name: 'Patrick Tunezerwane',
    email: 'tp1@gmail.com',
    nationalID: '1234345612456780',
    phoneNumber: '0781429260',
    dateOfBirth: '01-01-1999',
    status: 'active',
    position: 'Manager ',
    password: '12345',
  },
  missingField: {
    name: '',
    email: 'tp1@gmail.com',
    nationalID: '1234345612456780',
    phoneNumber: '0781429260',
    dateOfBirth: '01-01-1999',
    status: 'active',
    position: 'Manager ',
    password: '12345',
  },
  emailInUse: {
    name: 'Patrick Tunezerwane',
    email: 'tp@gmail.com',
    nationalID: '1234345612456780',
    phoneNumber: '0781429260',
    dateOfBirth: '01-01-1999',
    status: 'active',
    position: 'Manager ',
    password: '12345',
  },
};

export default mockData;