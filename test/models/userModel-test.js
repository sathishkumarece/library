const assert = require('assert');
const User = require('../../models/userModel');
const app = require('../../index');

describe('User model testing', () => {
    //Wait for the DB to be started before executing the tests
    before(function (done) {
        app.on("dbStarted", function(){
            done();
        });
    });

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
                    assert.strictEqual(err, 'user1')
                });
        })
    })

})