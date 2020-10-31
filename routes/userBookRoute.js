const Router = require('express').Router()
const UserBook = require('../models/userBookModel')

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
    UserBook.findOneAndUpdate({_id: req.params.id}, req.body, (err,data)=>{
        if(err) res.status(400).json({'error':'Error during update'})
        res.status(200).send('UserBook updated successfully')
    })
})

Router.get('/all', (req,res)=>{
    UserBook.find({},(err, userBook)=>{
        if(err) res.status(400).json({'error':'Error during get call'})
        res.status(200).send(userBook)
    })
})

Router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    if(!id){
        res.status(400).json({'error':'Missing required parameter'})
    }
    UserBook.deleteOne({_id:id}, (err, data)=>{
        if(err) res.status(400).json({'error':'Error during delete'})
        res.status(200).send('UserBook deleted successfully')
    })
})

module.exports = Router;