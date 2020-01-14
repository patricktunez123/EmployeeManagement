[![Maintainability](https://api.codeclimate.com/v1/badges/3a529494220c941cf36d/maintainability)](https://codeclimate.com/github/patricktunez123/EmployeeManagement/maintainability) [![Coverage Status](https://coveralls.io/repos/github/patricktunez123/EmployeeManagement/badge.svg)](https://coveralls.io/github/patricktunez123/EmployeeManagement) [![Build Status](https://travis-ci.org/patricktunez123/EmployeeManagement.svg?branch=develop)](https://travis-ci.org/patricktunez123/EmployeeManagement)

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

### Linting Library

- ESLint

### Style Guide

- Airbnb

### Database

- Postgres

### Deployment

- Heroku

### API Documentation

> Link to Swagger docs on heroku

[API Documentation on heroku](https://employee-management-awesomity.herokuapp.com/docs/)
---

## Features

- A manager is able to create an employee bypassing these details to the API (employee name, national id, phone number, email, date of birth, status(active, inactive) and position(manager, developer, designer, etc...)
- A manager must login to register or modify an employee.
- A manager is able to edit employee records.
- A manager is able to suspend an employee.
- A manager is able to activate an employee.
- A manager is able to delete an employee.
- A manager is able to create an account by providing his/her employee name, national id number, phone number, email, date of birth, status and position; the position property is generated automatically as Manager upon signup.
- A manager is able to login and receive a  token.
- A manager is able to search for an employee based on his position, name, email or phone number.
- API Swagger Documentation
- The manager’s password is encrypted
- Emails are validated
- The national id is 16 max/min numbers
- National Id, Email and phone are unique
- The system throws exceptions if any error occurs.

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

- PORT=PUT ANY PORT OF YOUR CHOICE HERE
- JWT_KEY=jwtKey
- DATABASE_URL=postgres://someuser:somepassword@somehost:5432/somedatabase
- NODE_ENV='development'

## Create Database

Open postges that we have installed earlier (Checkout Prerequisites above), and then create a database and call it employee_management.

## Run the server

- npm run devStart

cd into project directory and by using terminal, run the above command (npm run devStart) it will start your server and then you will be able to test endpoints in Postman

## Test Swagger Docs locally

After runnig the server, open browser and type 'http://localhost:5000/docs/' in the url.
NOTE: Note that i have used 5000 after http://localhost: , this is the PORT that my server is running on so you too have to use the PORT that you have specified in .env file, remember?

## Run tests

- npm run test

cd into project directory and run the above command (npm run test), it will run tests

## Author

- Tunezerwane Patrick <tunezepatrick@gmail.com>

---

## License & copyright
MIT License

Copyright (c) 2020 Patrick TUNEZERWANE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
