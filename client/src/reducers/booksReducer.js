import {GET_BOOKS, UPDATE_BOOK, ADD_USERBOOK, GET_USERBOOK, DELETE_USERBOOK} from '../constants/types'

const initialState = {
    allBooks : [],
    myBooks: []
}

export default (state=initialState, action) =>{
    switch(action.type){
        case GET_BOOKS:
            return {
                ...state,
                allBooks: action.payload
            }
        case UPDATE_BOOK:
            const index = state.allBooks.findIndex(book => book._id === action.payload._id)
            return {
                ...state,
                allBooks: [
                    ...state.allBooks.slice(0, index), // everything before current post
                    {
                        ...state.allBooks[index],
                        copies: action.payload.copies,
                    },
                    ...state.allBooks.slice(index + 1), // everything after current post
                ]
                
            }

        case ADD_USERBOOK:
            return {
                ...state,
                myBooks: [
                    ...state.myBooks,
                    action.payload
                ]
            }
        case GET_USERBOOK:
            return {
                ...state,
                myBooks: action.payload
            }
        case DELETE_USERBOOK:
            const myBookIndex = state.myBooks.findIndex(book => book._id === action.payload._id)
            return{
                ...state,
                myBooks: [
                    ...state.myBooks.slice(0, myBookIndex),
                    ...state.myBooks.slice(myBookIndex+1),
                ]
            }
        default:
            return state
    }
}