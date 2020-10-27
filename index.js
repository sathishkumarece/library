//Declaring the module dependencies
const express = require('express');
const bodyParser = require('body-parser');

//Initalizing express app
const app = express();

app.use(bodyParser.urlencoded({'extended':true}))
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('Got it');
})

//Lauch the application using desired port
const port = process.env.PORT | '8081'
app.listen(port, ()=>{
    console.log('Server ready to serve');
})