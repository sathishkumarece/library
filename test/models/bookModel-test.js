const assert = require('assert');
const Book = require('../../models/bookModel')

describe('validating booking model',()=>{
   
    describe('get list of books', () => {
        it('should return a list of available book',(done)=>{
            Book.find()
            .then(books => {
                assert.strictEqual(books.length, 6); 
                done();
            }).catch(err=>{
                done(err);
            });
        })
    })
    
    describe('get book which match title', () => {
        it('should return a book which match the title',(done)=>{
            Book.findOne({ title:'Learning JavaScript Design Patterns'})
            .then(book => {
                assert.strictEqual(book.title, 'Learning JavaScript Design Patterns'); 
                done();
            }).catch(err=>{
                done(err);
            });
        })
    })
    
})