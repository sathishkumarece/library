import axios from 'axios'
import {ERRORS, GET_BOOKS} from '../constants/types'

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