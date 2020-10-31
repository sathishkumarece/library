import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getBooks} from '../actions/booksAction'
import {Container, Row, Col} from 'react-bootstrap' 

import './AllBooks.css'
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

    render() {
        const {allBooks} = this.props.books;
        console.log(allBooks);
        
        return (
            <React.Fragment>
            <div className='allbooks-wrapper'>
                {allBooks.map((book) =>{
                   return (
                       <div className='books-padding'>
                            <Container>
                                <Book book={book}/>
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

export default connect(mapStateToProps, {getBooks})(AllBooks)
