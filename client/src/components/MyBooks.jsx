import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getMyBooks, removeMyBook } from '../actions/booksAction'
import { Container } from 'react-bootstrap'

import Book from './Book'
import './books.css'

export class MyBooks extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    books: PropTypes.object.isRequired,
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if(this.props.books.myBooks.length === 0){
      this.props.getMyBooks()
  }
  }

  onClickProcess(id) {
    const book = this.props.books.allBooks.filter(book => book._id === id)[0]
    book.copies = book.copies + 1
    this.props.removeMyBook(book)
  }

  render() {
    const { myBooks } = this.props.books
    let noBooks;
    if(myBooks.length === 0){
      noBooks = <h3>No books found under your borrowed account</h3>
    }
    return (
      <div className='allbooks-wrapper'>
        {myBooks.map((book) => {
          return (
            <div className='books-padding'>
              <Container>
                <Book
                  book={book}
                  type='Return'
                  disabled = ''
                  onClickProcess={() => this.onClickProcess(book._id)}
                ></Book>
              </Container>
            </div>
          )
        })}
        {noBooks}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  books: state.books,
})

export default connect(mapStateToProps, { getMyBooks, removeMyBook })(MyBooks)
