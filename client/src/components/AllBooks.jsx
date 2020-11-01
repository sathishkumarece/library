import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getBooks, updateBook, getMyBooks} from '../actions/booksAction'
import {Container} from 'react-bootstrap' 

import './books.css'
import Book from './Book.jsx'

export class AllBooks extends Component {

    constructor(){
        super()
        this.state = {
            books: {}
        }
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }else{
            this.props.getBooks()
            if(this.props.books.myBooks.length === 0){
                this.props.getMyBooks()
            }
        }
    }

    shouldComponentUpdate(nextProps) {
        if(!nextProps.auth.isAuthenticated){
            this.props.history.push('/')
        }
        return true
    }

    static propTypes = {
        books: PropTypes.object.isRequired
    }

    onClickBorrow(id){
        const book = this.props.books.allBooks.filter(book => book._id === id)[0]
        book.copies = book.copies - 1
        this.props.updateBook(book)
    }

    render() {
        const {allBooks, myBooks} = this.props.books;
        
        return (
            <React.Fragment>
            <div className='allbooks-wrapper'>
                {allBooks.filter(book=> book.copies > 0).map((book) =>{
                    const index = myBooks.findIndex(mybooks => mybooks._id === book._id)
                   return (
                       <div className='books-padding'>
                            <Container>
                                <Book book={book} type="Borrow" disabled={myBooks.length<2?index===-1?'':'disabled':'disabled'} onClickProcess= {()=> this.onClickBorrow(book._id)}/>
                            </Container>
                       </div>
                       )
                })}
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    books: state.books
})

export default connect(mapStateToProps, {getBooks, updateBook, getMyBooks})(AllBooks)
