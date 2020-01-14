import ENV from 'dotenv';
import chai from 'chai';
import { describe, it } from 'mocha';
import http from 'chai-http';
import jwt from 'jsonwebtoken';
import mockData from '../mockData/mockData';
import app from '../../server';

ENV.config();
chai.use(http);
chai.should();

describe('When manager is registering an employee ', () => {
  it('should not be able to register an employee if a token was not provided', (done) => {
    chai.request(app)
      .post('/employees')
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  const token = jwt.sign(mockData, process.env.JWT_KEY, { expiresIn: '365d' });

  it('should  be able register if a token is given ', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should not be able to register if there is an error in inputs', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to register if employee name is not provided', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: '',
        nationalID: '238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to register if NID is not provided', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to register if Phone is not provided', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '238284',
        phoneNumber: '',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to register if email is not provided', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '238284',
        phoneNumber: '0781429268',
        email: '',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to register if DOB is not provided', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to register if status is not provided', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: '',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to register if position is not provided', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to register if email provided is already taken', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '9994449494020202',
        phoneNumber: '0781429268',
        email: 'patric3@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to register if phone provided is already taken', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '0001200889999022',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to register if NID provided is already taken', (done) => {
    chai.request(app)
      .post('/employees')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi',
        nationalID: '3472472747274727',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error');
        done();
      });
  });
});
