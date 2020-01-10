import { describe, it } from 'mocha';
import chai from 'chai';
import http from 'chai-http';
import mockData from '../mockData/mockData';
import app from '../../server';

chai.use(http);
chai.should();

describe('When manager is signing up', () => {
  it('should be able to signup', (done) => {
    chai.request(app)
      .post('/signup')
      .send(mockData.canSignUp)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        done();
      });
  });


  it('should not be saved if there is a missing field', (done) => {
    chai.request(app)
      .post('/signup')
      .send(mockData.missingField)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.should.have.property('status').eql(400);
        res.should.have.property('error');
        done();
      });
  });

  it('should not be saved if an email has been already used', (done) => {
    chai.request(app)
      .post('/signup')
      .send(mockData.emailInUse).end((err, res) => {
        res.should.have.status(409);
        res.should.be.an('object');
        res.should.have.property('status').eql(409);
        res.should.have.property('error');
        done();
      });
  });
});
