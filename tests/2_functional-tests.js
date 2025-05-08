const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Convert 10L (valid)', done => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        done();
      });
  });

  test('Convert 32g (invalid unit)', done => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  test('Convert 3/7.2/4kg (invalid number)', done => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  test('Convert 3/7.2/4kilomegagram (invalid number and unit)', done => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  test('Convert kg (no number defaults to 1)', done => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end((err, res) => {
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        done();
      });
  });
});
