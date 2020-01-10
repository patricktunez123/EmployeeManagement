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

describe('when manager is trying to update an employee ', () => {
  it('should not be able to update if no token provided', (done) => {
    chai.request(app)
      .put('/employees/1')
      .send({
        employeeName: 'Divine Manzi Updated',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: 01-01-2000,
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  const token = jwt.sign(mockData, process.env.JWT_KEY, { expiresIn: '365d' });

  it('should not be able to update if there is an error in inputs', (done) => {
    chai.request(app)
      .put('/employees/1')
      .set('x-auth-token', token)
      .send({
        employeeName: '',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: 01-01-2000,
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


  it('should not be able to update if an employee is not available', (done) => {
    chai.request(app)
      .put('/employees/800')
      .set('x-auth-token', token)
      .send({
        employeeName: '',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: 01-01-2000,
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should  be able to update if an employee is found and a request is from manager ', (done) => {
    chai.request(app)
      .put('/employees/1')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi Updated',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe90@gmail.com',
        dateOfBirth: 01-01-2000,
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        done();
      });
  });
});
