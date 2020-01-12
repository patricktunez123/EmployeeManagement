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

describe('When manager wants to search for an employee ', () => {
  it('should not be able to search an employee when no token provided', (done) => {
    chai.request(app)
      .post('/employees/search')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  const token = jwt.sign(mockData, process.env.JWT_KEY, { expiresIn: '365d' });

  it('should not be able to search for an employee who is not available ', (done) => {
    chai.request(app)
      .post('/employees/search')
      .set('x-auth-token', token)
      .send({
        phoneNumber: '00d0020202',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        done();
      });
  }); 

  it('should be able to search for an employee if available and token was given', (done) => {
    chai.request(app)
      .post('/employees/search')
      .set('x-auth-token', token)
      .send({
        phoneNumber: '0781429268',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('Results');
        done();
      });
  });
});
