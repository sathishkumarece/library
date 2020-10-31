//Declaring the module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const userRouter = require('./routes/userRoute');
const bookRouter = require('./routes/bookRoute');
const userBookRouter = require('./routes/userBookRoute');

//Initalizing express app
const app = express();

app.use(bodyParser.urlencoded({'extended':true}))
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('Got it');
})

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology: true})
.then(() =>{
    console.log('DB connected successfully');
    app.emit("dbStarted");
}).catch((err) =>{
    console.log(err);
})

app.use(passport.initialize());
require('./auth/auth');

app.use('/api/user', userRouter);
app.use('/api/books/', passport.authenticate('jwt',{session:false}), bookRouter);
app.use('/api/userbook/', passport.authenticate('jwt',{session:false}), userBookRouter);

//Lauch the application using desired port
const port = process.env.PORT | '8081'
app.listen(port, ()=>{
    console.log('Server ready to serve');
})

module.exports = app;