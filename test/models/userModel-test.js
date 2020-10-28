const assert = require('assert');
const User = require('../../models/userModel');
const app = require('../../index');

describe('User model testing', () => {

    describe('should create User', () => {
         //require assert which was installed along with mocha
         const user = new User({ name: 'user1', email: 'user1@example.com', password: 'password'});
         it('User saved successfully', (done) =>{
             user.save() //takes some time and returns a promise
                 .then(() => {
                     assert(!user.isNew); //if user is saved to db it is not new
                     done();
                 });
         })
    })

    describe('Reading User details', () => {
        it('should find the user', (done) => {
            User.findOne({ email: 'user1@example.com' })
                .then(user => {
                    assert.strictEqual(user.name, 'user1'); 
                    done();
                }).catch(err=>{
                    done(err);
                });
        })
    })

})