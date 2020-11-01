const Router = require('express').Router();
const Book = require('../models/bookModel');
const UserBook = require('../models/userBookModel');

Router.get('/all',(req,res)=>{
    Book.find()
    .then((books) => {
        res.json(books)
    })
    .catch((err)=>{
        res.status(400).json({error: err})
    })
})

Router.put('/:id', (req, res)=>{
    const body = req.body;
    if(!body){
        res.status(400).json({error:'Missing parameter'})
    }
    Book.findOneAndUpdate({_id: req.params.id}, req.body, (err, data)=>{
        if(err) res.status(400).json({error: 'Update failed'})
        const userBook = {book_id:req.params.id,user_id:req.user.id, copies:1}
        UserBook.create(userBook, (err, data)=>{
            if(err) res.status(400).json({error: 'Update failed'})
            res.status(200).send('Book & Userbook updated successfully')
        })
    })
})

module.exports = Router;