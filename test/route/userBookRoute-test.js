const request = require('supertest');
const assert = require('assert');
const app = require('../../index');

describe('Testing user book route', () => {

    before((done)=>{
        request(app)
            .post('/api/user/login')
            .send({ email: 'sathishkumarece@gmail.com', password: 'q'})
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                this.token = res.body.token;
                done();
            })
    })

    describe('inserting the value to user book', () => {
        const userBook = {book_id: '5f990f0ddc5720478490ad5b', user_id: '5f9c5311d1245b3cacc4d5b8', copies: 1}
        it('should insert the user book value', (done)=>{
            request(app)
            .post('/api/userbook/new')
            .set('Authorization', this.token)
            .send(userBook)
            .expect(200)
            .end((err, res)=>{
                if (err) return done(err);
                done();
            })
        })
    })
    
    describe('getting all user books', () => {
        it('should return the user books', (done)=>{
            request(app)
            .get('/api/userbook/all')
            .set('Authorization', this.token)
            .expect(200)
            .end((err, res)=>{
                if (err) return done(err);
                assert.strictEqual(res.body.length, 4)
                done()
            })
        })
    })

    describe('Updating the user book', () => {
        it('should update the user book', (done) => {
            request(app)
            .put('/api/userbook/5f9dae2fb1afdf46bcec431d')
            .send({copies: 2})
            .set('Authorization', this.token)
            .expect(200)
            .end((err, res) =>{
                if (err) return done(err);
                assert.strictEqual(res.text, 'UserBook updated successfully')
                done()
            })
        })
    })

    describe('Deleting the user book', () => {
        it('should delete the user book', (done)=>{
            request(app)
            .delete('/api/userbook/5f9db40631b37045546e2c0d')
            .set('Authorization', this.token)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.text, 'UserBook deleted successfully')
                done()
            })
        })
    })
    

})
