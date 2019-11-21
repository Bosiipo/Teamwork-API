import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../app';
import fs from 'fs';

chai.use(chaiHttp);

// Run before each test
describe('Gif', () => {
  let generatedToken = null;
  let employeeToken = null;
  // Login employee to generate employeeToken before test

  //   before(
  //     'Login admin to obtain auth token to be used in other operations',
  //     done => {
  //       const adminCredentials = {
  //         email: 'tosin@gmail.com',
  //         password: 'tosin'
  //       };

  //       chai
  //         .request(app)
  //         .post('/api/v1/auth/admin/login')
  //         .send(adminCredentials)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           if (!err) {
  //             generatedToken = res.body.token;
  //           }
  //           done();
  //         });
  //     }
  //   );

  before(
    'Login employee to obtain auth token to be used in other operations',
    done => {
      const employeeCredentials = {
        email: 'tosin@gmail.com',
        password: 'tosin'
      };

      chai
        .request(app)
        .post('/api/v1/auth/employee/login')
        .send(employeeCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          if (!err) {
            employeeToken = res.body.token;
          }
          done();
        });
    }
  );

  // Test the POST /gif/ route

  describe('POST /gifs', () => {
    // it('should not post without a gif field', done => {
    //   const gif = {
    //     title: 'Yup'
    //   };
    //   chai
    //     .request(app)
    //     .post('/api/v1/gifs')
    //     .send(gif)
    //     .set('authorization', employeeToken)
    //     .end((err, res) => {
    //       res.should.have.property('status', 500);
    //       res.body.should.be.a('object');
    //       done();
    //     });
    // });

    // MARK GIF TTTTEEEEEEEEEEEEEESSSSSSSSSSSSTTTTTTTTTTTTTTT!!!!!!!!!!!
    it('should post a gif', done => {
      chai
        .request(app)
        .post('/api/v1/gifs')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('authorization', employeeToken)
        .field('title', 'Yeah')
        .attach(
          'image',
          fs.readFileSync(
            'C:/Users/USER/Pictures/CSS/casey-horner-1057063-unsplash'
          ),
          'casey-horner-1057063-unsplash'
        )
        .end((err, res) => {
          res.should.have.property('status', 200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.data.should.have.property('message');
          res.body.data.should.have.property('title');
          res.body.data.should.have.property('result');
          done();
        });
    });
  });

  //   describe('GET /gifs/:id', () => {
  //     it('should get a gif by the given id', done => {
  //       const gifId = 13;
  //       chai
  //         .request(app)
  //         .get(`/api/v1/gifs/${gifId}`)
  //         .set('authorization', employeeToken)
  //         .end((err, res) => {
  //           res.should.have.property('status', 200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('status').eql('success');
  //           res.body.data.should.have.property('gifs');
  //           done();
  //         });
  //     });

  //     it('should throw an error when a number is not passed as id', done => {
  //       const gifId = 'o';
  //       chai
  //         .request(app)
  //         .get(`/api/v1/gifs/${gifId}`)
  //         .set('authorization', employeeToken)
  //         .end((err, res) => {
  //           res.should.have.property('status', 500);
  //           //   res.body.should.have.be.a('object');
  //           done();
  //         });
  //     });
  //   });

  //   describe('PUT /gifs/:id', () => {
  //     it('should update an gif given the id', done => {
  //       const gifId = 9;
  //       const updateGif = {
  //         id: gifId,
  //         title: 'YES!',
  //         gif: 'This is it!',
  //         employeeId: 4
  //       };
  //       chai
  //         .request(app)
  //         .put(`/api/v1/gifs/${gifId}`)
  //         .send(updateGif)
  //         .set('authorization', employeeToken)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.data.should.have
  //             .property('message')
  //             .eql('gif successfully updated!');
  //           done();
  //         });
  //     });
  //     it('should throw an error when a number is not passed as id', done => {
  //       const gifId = gifId;
  //       const updateGif = {
  //         id: 'o',
  //         title: 'Hush the fuc',
  //         gif: 'This is it!',
  //         employeeId: 4
  //       };
  //       chai
  //         .request(app)
  //         .put(`/api/v1/gifs/${gifId}`)
  //         .send(updateGif)
  //         .set('authorization', employeeToken)
  //         .end((err, res) => {
  //           res.should.have.property('status', 500);
  //           res.body.should.have.be.a('object');
  //           res.body.should.have.property('message').eql('You cannot do that!');
  //           done();
  //         });
  //     });
  //   });

  //   describe('DELETE /gifs/:id', () => {
  //     it('should not delete if Id is null', done => {
  //       const gifId = 'o';
  //       chai
  //         .request(app)
  //         .delete(`/api/v1/gifs/${gifId}`)
  //         .set('authorization', employeeToken)
  //         .end((err, res) => {
  //           res.should.have.status(500);
  //           res.body.should.be.a('object');
  //           res.body.status.should.have('name').eql('SequelizeDatabaseError');
  //           done();
  //         });
  //     });

  //     it('should delete a gif with id', done => {
  //       const gifId = 10;
  //       chai
  //         .request(app)
  //         .delete(`/api/v1/gifs/${gifId}`)
  //         .set('authorization', employeeToken)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('status').eql('success');
  //           done();
  //         });
  //     });
  //   });
});
