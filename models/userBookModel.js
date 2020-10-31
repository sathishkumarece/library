const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserBookSchema = new Schema({ 
    book_id: {type: Schema.Types.ObjectId, required:true},
    user_id: {type: Schema.Types.ObjectId, required:true},
    copies: {type:Number, required:true}
},{collection: 'userbook'})

module.exports = UserBookModel = mongoose.model('UserBook', UserBookSchema)