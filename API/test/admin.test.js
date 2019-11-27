import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('Admin', () => {
    let generatedToken = null;
    before(
        'Login admin to obtain auth token to be used in other operations',
        done => {
            const adminCredentials = {
                email: 'femiajayi@gmail.com',
                password: 'femiajayi',
            };

            chai.request(app)
                .post('/api/v1/auth/admin/login')
                .send(adminCredentials)
                .end((err, res) => {
                    res.should.have.status(200);
                    if (!err) {
                        generatedToken = res.body.token;
                    }
                    done();
                });
        }
    );

    //   it('should create new Admin', done => {
    //     const newAdmin = {
    //       firstname: 'Martins',
    //       lastname: 'Ajayi',
    //       email: 'martinsjayi@gmail.com',
    //       password: 'martinsajayi'
    //     };
    //     chai
    //       .request(app)
    //       .post('/api/v1/auth/admin/register')
    //       .send(newAdmin)
    //       .end((err, res) => {
    //         res.should.have.status(201);
    //         res.body.should.be.a('object');
    //         res.body.should.have.property('message').eql('Admin Registered');
    //         res.body.should.have.property('status').eql('success');
    //         res.body.should.have.property('token');
    //         done();
    //       });
    //   });

    //   it('should create a new employee', done => {
    //     const newEmployee = {
    //       firstname: 'Badguy',
    //       lastname: 'Tizzle',
    //       email: 'mother@gmail.com',
    //       password: 'password',
    //       gender: 'male',
    //       jobRole: 'Architect',
    //       department: 'Surveying',
    //       address: '28, shiaba street Agege, Lagos.'
    //     };
    //     chai
    //       .request(app)
    //       .post('/api/v1/auth/admin/create-user')
    //       .send(newEmployee)
    //       .set('authentication', generatedToken)
    //       .end((err, res) => {
    //         res.should.have.status(201);
    //         res.body.should.be.a('object');
    //         res.body.should.have.property('message').eql('Employee Registered');
    //         res.body.should.have.property('status').eql('success');
    //         res.body.should.have.property('token');
    //         done();
    //       });
    //   });

    it('should not create an admin if email already exists', done => {
        const newAdmin = {
            firstname: 'Sean',
            lastname: 'Mica',
            email: 'martinsajayi@gmail.com',
            password: 'ole',
        };
        chai.request(app)
            .post('/api/v1/auth/admin')
            .send(newAdmin)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                // res.body.should.have.property('message').eql('Incorrect parameters');
                // res.body.should.have.property('status').eql('error');
                done();
            });
    });

    it('should not create an admin without a password field', done => {
        const newAdmin = {
            firstname: 'Seannn',
            lastname: 'Micarian',
            email: 'marti@gmail.com',
        };
        chai.request(app)
            .post('/api/v1/auth/admin')
            .send(newAdmin)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                // res.body.should.have.property('message').eql('Incorrect parameters');
                // res.body.should.have.property('status').eql('error');
                done();
            });
    });
});
