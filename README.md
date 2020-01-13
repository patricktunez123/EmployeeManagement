# EmployeeManagement
Employee management system will help the manager to be able to register and do modifications on the employees records
------------------------------------------------------------------------------

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| /signup| POST | Create account |
| /signin | POST | Log In a manager |
| /employees | POST | Register an employee |
| /employees/:id/ | PUT | Edit an employee |
| /employees/:id/ | DELETE | Delete an employee|
| /employees/:id/activate | PUT | Activate an employee |
| /employees/:id/suspend | PUT | Suspend an employee |
| /employees/search | POST | search for an employee |

------------------------------------------------------------------------------

## Used Tools and Technologies

### Language

- Javascript

### Server Environment

- NodeJS

### Framework

- Express (for building fast APIs)

### Testing Framework and Assertion library

- Mocha and Chai

### Continuous Integration

- Travis CI

### Test Coverage

- nyc

### Code coverage insight service 

- coveralls

### Deployment

- Heroku

### Heroku link



### API Documentation


---

## How to set up and test this app

These instructions will get you a copy of this project up and running on your local machine for development and testing purposes.

## Prerequisites

To install this project on your local machine, you need first to clone the repository ```https://github.com/patricktunez123/EmployeeManagement.git``` or download the zip file and once this is set up you are going to need NODEJS ([Node Package Installer - NPM]) and Postgresql as well as Postman installed on your machine.

## Installing

The installation of this application is fairly straightforward, After cloning this repository to your local machine, cd into it using your terminal and run the following command

- npm install

It will install the node_modules which will help you run this project on your local machine.

## Set environment variables

After successfully installed all packages the next step is to set up environment variables, in root folder create a file and call it .env and open this file in any text editor of your choice then paste the following into it (Do not forget to edit it accordingly):

PORT=PUT ANY PORT OF YOUR CHOICE HERE
JWT_KEY=jwtKey
HOST=localhost
USER=PUT USERNAME OF YOUR DB HARE (Example: postgres)
PASSWORD=PUT PASSWORD TO YOUR DB HERE
TESTDB=employee_management
DB_PORT=PUT DATABASE PORT HERE(Example: 5432)
NODE_ENV='development'

## Create Database

Open postges that we have installed earlier (Checkout Prerequisites above), and then create a database and call it employee_management.

## Run the server

- npm run devStart

## Test Swagger Docs locally

After runnig the server, open browser and type 'http://localhost:5000/docs/' in the url.
NOTE: Note that i have used 5000 after http://localhost: , this is the PORT that my server is running on so you too have to use the PORT that you have specified in .env file, remember?

## Run tests

- npm run test

## Author

- Tunezerwane Patrick <tunezepatrick@gmail.com>

---

## License & copyright
Copyright (c) Tunezerwane Patrick