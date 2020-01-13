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

describe('when manager is trying to activate an employee ', () => {
  it('should not be able to activate if no token provided', (done) => {
    chai.request(app)
      .put('/employees/1/activate')
      .send({
        status: 'active'
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  const token = jwt.sign(mockData, process.env.JWT_KEY, { expiresIn: '365d' });

  it('should not be able to activate if an employee is not available', (done) => {
    chai.request(app)
      .put('/employees/800/activate')
      .set('x-auth-token', token)
      .send({
        status: 'active'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should  be able to activate if an employee is found and a request is from manager ', (done) => {
    chai.request(app)
      .put('/employees/1/activate')
      .set('x-auth-token', token)
      .send({
        status: 'active',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message');
        res.body.should.have.property('UserInfo');
        done();
      });
  });
});
