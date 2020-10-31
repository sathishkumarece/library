import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import booksReducer from './booksReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    books: booksReducer
})