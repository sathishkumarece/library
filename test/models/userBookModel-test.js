const assert = require('assert');
const UserBook = require('../../models/userBookModel');

describe('Testing user book mapping model', () => {
    describe('should create user book', () => {
        const userBook = {book_id: '5f990f0ddc5720478490ad5a', user_id: '5f9c5311d1245b3cacc4d5b8', copies: 1}
        it('should create user book', (done)=>{
            UserBook.create(userBook)
            .then(() =>{
                assert(!userBook.isNew); //if user model is saved to db it is not new
                done();
            })
        })
    })
})
