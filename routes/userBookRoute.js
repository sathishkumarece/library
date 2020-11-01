const Router = require('express').Router()
const UserBook = require('../models/userBookModel')
const Book = require('../models/bookModel')

Router.post('/new', (req,res)=>{
    const userBook = req.body
    if(!userBook){
        res.status(400).json({'error':'Missing required parameter'})
    }
    UserBook.create(userBook)
    .then(()=>{
        res.status(200).send('UserBook saved successfully')
    })
})

Router.put('/:id', (req,res)=>{
    const id = req.params.id;
    if(!id){
        res.status(400).json({'error':'Missing required parameter'})
    }
    UserBook.findOneAndUpdate({book_id:id, user_id:req.user.id}, req.body, (err,data)=>{
        if(err) res.status(400).json({'error':'Error during update'})
        if(data!=null && !data.isNew){
            Book.findOneAndUpdate({_id:req.body.book_id}, {$inc: {copies:1}}, (err, data)=>{
                if(err) res.status(400).json({'error':'Error during delete'})
                res.status(200).send('UserBook/Book updated successfully')
            })
        }else{
            res.status(200).send('UserBook updated successfully')
        }
    })
})

Router.get('/all', (req,res)=>{
    UserBook.find({user_id: req.user.id},(err, userBooks)=>{
        if(err) res.status(400).json({'error':'Error during get all user book'})
        const userBookId = userBooks.map(userbook => userbook.book_id)
        Book.find({_id: userBookId}, (err, books)=>{
            if(err) res.status(400).json({'error':'Error during get all user book'})
            const myBooks = books.map(book => {
                const index = userBooks.findIndex(userbook => userbook.book_id == book.id)
                return {...book._doc, copies:userBooks[index].copies}
            })
            res.status(200).send(myBooks)
        })
    })
})

Router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    if(!id){
        res.status(400).json({'error':'Missing required parameter'})
    }
    UserBook.deleteOne({book_id:id, user_id:req.user.id}, (err, data)=>{
        if(err) res.status(400).json({'error':'Error during delete'})
        if(data!=null && data.deletedCount === 1){
            Book.findOneAndUpdate({_id:id}, {$inc: {copies:1}}, (err, data)=>{
                if(err) res.status(400).json({'error':'Error during delete'})
                res.status(200).send('UserBook/Book deleted/updated successfully')
            })
        }else{
            res.status(200).send('UserBook deleted successfully')
        }
    })
})

module.exports = Router;