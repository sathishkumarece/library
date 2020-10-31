import axios from 'axios'
import {ERRORS, GET_BOOKS, UPDATE_BOOK, ADD_USERBOOK} from '../constants/types'

export const getBooks = () => dispatch => {
    axios.get('/api/books/all')
    .then((res) =>{
        dispatch({ 
            type: GET_BOOKS,
            payload: res.data
        })
    }).catch((err) =>{
        console.log(err);
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    })
}

export const updateBook = (book) => dispatch => {
    axios.put('/api/books/'+book._id, book)
    .then((res) =>{
        dispatch({ 
            type: UPDATE_BOOK,
            payload: book
        })
        dispatch({
            type: ADD_USERBOOK,
            payload: book
        })
    })
}