import axios from 'axios'
import {ERRORS, GET_BOOKS, UPDATE_BOOK, ADD_USERBOOK, GET_USERBOOK, DELETE_USERBOOK} from '../constants/types'

export const getBooks = () => dispatch => {
    axios.get('/api/books/all')
    .then((res) =>{
        dispatch({ 
            type: GET_BOOKS,
            payload: res.data
        })
    }).catch((err) =>{
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
            payload: {...book, copies:1}
        })
    }).catch((err) =>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    })
}

export const getMyBooks = () => dispatch => {
    axios.get('/api/userbook/all')
    .then((response) =>{
        dispatch({
            type: GET_USERBOOK,
            payload: response.data
        })
    }).catch((err)=>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    })
}

export const removeMyBook = (book) => dispatch => {
    axios.delete('/api/userbook/'+book._id)
    .then((response) =>{
        dispatch({
            type: DELETE_USERBOOK,
            payload: book
        })
        dispatch({
            type: UPDATE_BOOK,
            payload: book
        })
    }).catch((err) => {
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    })
}