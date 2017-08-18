
let chai        = require('chai');
let chaiHttp    = require('chai-http');
let server      = require('../server');
let should      = chai.should();

chai.use(chaiHttp);

describe('JWT Authentication Service', () => {
    // Test the authenticate route
    describe('/POST authenticate', () => {
        it('it should authenticate a user', (done) => {
            chai.request(server)
            .post('/authenticate')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'test', password: 'test'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success', true);
                res.body.should.have.property('message', 'User authenticated');
                res.body.should.have.property('token');
                done();
            });
        });
    });

    // Test the user route
    describe('/GET user', () => {
        it('it should fail to get a user', (done) => {
            chai.request(server)
            .get('/user')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success', false);
                res.body.should.have.property('message', 'Missing authorization token');
                done();
            });
        });
    });
});
  