//Declaring dependencies
const Router = require('express').Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//Register the user
Router.post('/register',(req,res) =>{
    let errors = {}
    let body = req.body;
    User.findOne({ email: req.body.email })
    .then(user => {
      // check if that user exists:
      if(user) {
        errors.error = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        User.create(body, function (err, post) {
            if (err) return res.status(400).json(errors.err);
            console.log(post);
            console.log(post['_id']);
            res.send("Successfully registered");
         });
        }
    })
})

//Retrieve the user's profile
Router.post('/login',(req,res) => {
    const body = req.body;
    if(!body.email || !body.password){
        res.status(400).json({error: 'Invalid email or password'});
    }
    User.findOne({ 'email': body.email }, function (err, user) {
        if (err) return res.status(400).json({error: 'Invalid email'});
        if(!err && !user){
            return res.status(400).json({error: 'Invalid email'});
        }
        if (user != null) {
            user.comparePassword(body.password, function (err, isMatch) {
                if (err) return res.status(400).json({error: "Password error"});
                if(isMatch){
                    const payload = {
                        id: user.id,
                        name: user.name,
                      }
                      // Sign Token
                      jwt.sign(
                        payload,
                        process.env.SECRET_OR_KEY,
                        { expiresIn: 86400 },
                        (err, token) => {
                          res.json({
                            success: true,
                            token: 'Bearer ' + token
                          });
                      });
                }else{
                    res.status(400).json({error: "Password doesn't match"})
                }
            });
        }
    });
})

 module.exports = Router;