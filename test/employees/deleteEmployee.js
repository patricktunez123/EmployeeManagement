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

describe('When manager needs to delete an employee ', () => {
  it('should not be able to delete an employee when no token provided', (done) => {
    chai.request(app)
      .delete('/employees/1')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  const token = jwt.sign(mockData, process.env.JWT_KEY, { expiresIn: '365d' });

  it('should not be able to delete an employee if not found', (done) => {
    chai.request(app)
      .delete('/employees/800')
      .set('x-auth-token', token)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should be able to delete an employee', (done) => {
    chai.request(app)
      .delete('/employees/1')
      .set('x-auth-token', token)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message');
        done();
      });
  });
});
