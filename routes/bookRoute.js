const Router = require('express').Router();
const Book = require('../models/bookModel');

Router.get('/all',(req,res)=>{
    Book.find()
    .then((books) => {
        res.json(books)
    })
    .catch((err)=>{
        res.status(400).json({error: err})
    })
})

module.exports = Router;