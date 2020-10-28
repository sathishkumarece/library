const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({ 
    title: {type:String, required:true,index: {unique: true}},
    author:{type:String, required:true},
    publisher:{type:String, required:true},
    pages:{type:Number, required:true},
    copies:{type:Number, required:true, max:2},
    description:{type:String, required:true}
},{collection: 'books'})

module.exports = BookModel = mongoose.model('Book', BookSchema);