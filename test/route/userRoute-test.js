const request = require('supertest');
const assert = require('assert');
const app = require('../../index');
const User = require('../../models/userModel');

describe('User route testing', () => {
    const user_router = { name: 'user2', email: 'user2@example.com', password: 'password'};
    describe('creating user from router - success',()=>{
        it('should create user success from router', (done)=>{
           request(app)
           .post('/api/user/register')
           .send(user_router)
           .expect(200)
           .end((err, res) => {
            if (err) return done(err);
            done();
          });
        })
    })

    describe('creating user from router - mail already exist',()=>{
        it('should not create user from router', (done)=>{
           request(app)
           .post('/api/user/register')
           .send(user_router)
           .expect(400)
           .end((err, res) => {
            if (err) return done(err);
            assert.strictEqual(res.body.error,'Email already exists')
            done();
            })
        })
    })

    describe('Login with user', ()=>{
        it('should return the valid token', (done) => {
            request(app)
            .post('/api/user/login')
            .send({ email: 'user2@example.com', password: 'password'})
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                this.token = res.body.token;
                assert.match(res.body.token, /Bearer/g)
                done();
            })
        })
    })
    
    describe('try to login without proper password', ()=>{
        it('should return as password does not match', (done) => {
            request(app)
            .post('/api/user/login')
            .send({ email: 'user2@example.com', password: 'pass'})
            .expect(400)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.error,"Password doesn't match")
                done();
            })
        })
    })
    
    describe('try to login without proper user', ()=>{
        it('should return as invalid email', (done) => {
            request(app)
            .post('/api/user/login')
            .send({ email: 'user3@example.com', password: 'password'})
            .expect(400)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.error,'Invalid email')
                done();
            })
        })
    })

    describe('try to login without email', ()=>{
        it('should provide email or password is not available', (done) => {
            request(app)
            .post('/api/user/login')
            .send({ email: '', password: 'password'})
            .expect(400)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.error,'Invalid email or password')
                done();
            })
        })
    })
    after((done)=>{
        User.deleteMany({ name:/user+/})
        .then((res)=>{
            console.log(res);
            done();
        })
        .catch(err=>{
            done(err);
        })
    })
})