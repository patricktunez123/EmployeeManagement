const mockData = {
  canLogin: {
    email: 'pazo20@gmail.com',
    password: '@12345@23',
  },
  emptyFields: {
    email: '',
    password: '',
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
    employeeName: 'Patrick Tunezerwane',
    email: 'tp1000@gmail.com',
    nationalID: '1234345612456700',
    phoneNumber: '0781429200',
    dateOfBirth: '01.01.1999',
    status: 'active',
    password: '12345',
  },
  missingField: {
    name: '',
    email: 'tp19090@gmail.com',
    nationalID: '1234345612456780',
    phoneNumber: '0781429260',
    dateOfBirth: '01.01.1999',
    status: 'active',
    position: 'Manager ',
    password: '12345',
  },
  emailInUse: {
    employeeName: 'Patrick Tunezerwane',
    email: 'pazo20@gmail.com',
    nationalID: '1234345612456780',
    phoneNumber: '0781429260',
    dateOfBirth: '01.01.1999',
    status: 'active',
    password: '12345',
  },
  phoneInUse: {
    employeeName: 'Patrick Tunezerwane',
    email: 'pazo20@gmail.com',
    nationalID: '1234345612456780',
    phoneNumber: '0781429268',
    dateOfBirth: '01.01.1999',
    status: 'active',
    password: '12345',
  },
  NIDInUse: {
    employeeName: 'Patrick Tunezerwane',
    email: 'pazo20@gmail.com',
    nationalID: '1199934678924362',
    phoneNumber: '0781429260',
    dateOfBirth: '01.01.1999',
    status: 'active',
    password: '12345',
  },
};

export default mockData;
