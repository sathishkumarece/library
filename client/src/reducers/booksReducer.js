import {GET_BOOKS} from '../constants/types'

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
        default:
            return state
    }
}