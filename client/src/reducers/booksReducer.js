import {GET_BOOKS, UPDATE_BOOK, ADD_USERBOOK} from '../constants/types'

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
            const index = state.allBooks.findIndex(book => book.id === action.payload.id)
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
        default:
            return state
    }
}