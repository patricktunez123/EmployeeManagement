import chai from 'chai';
import { describe, it } from 'mocha';
import http from 'chai-http';
import mockData from '../mockData/mockData';
import app from '../../server';

chai.use(http);
chai.should();

describe('When manager tries to login ', () => {
  it('should not be able to login if the email is incorrect', (done) => {
    chai.request(app)
      .post('/signin')
      .send(mockData.incorrectEmail)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        res.body.should.have.status(401);
        done();
      });
  });

  it('should not be able to login if password is not correct', (done) => {
    chai.request(app)
      .post('/signin')
      .send(mockData.incorrectPassword)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        res.body.should.have.status(401);
        done();
      });
  });

  it('should not be able to login if an email or password is incorrect ', (done) => {
    chai.request(app)
      .post('/signin')
      .send(mockData.incorrectEmailAndPwd)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        res.body.should.have.status(401);
        done();
      });
  });
});
