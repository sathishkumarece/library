const request = require('supertest');
const assert = require('assert');
const app = require('../../index');

describe('Book route testing', () => {
    describe('getting books without token', () => {
        it('should return as Unauthorized', (done) =>{
            request(app)
            .get('/api/books/all')
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.text, 'Unauthorized')
                done();
            });
        })
    })
    
    before((done)=>{
        request(app)
            .post('/api/user/login')
            .send({ email: 'user1@example.com', password: 'password'})
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                this.token = res.body.token;
                done();
            })
    })
    describe('getting books with valid token', () => {
        it('should return the list of books', (done) =>{
            request(app)
            .get('/api/books/all')
            .set('Authorization', this.token)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.length, 6)
                done();
            });
        })
    })
})
