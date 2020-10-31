import {LOGGED_USER} from '../constants/types'

const initialState = { 
    user: {},
    isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_USER:
            return {
                ...state,
                isAuthenticated: action.payload.email?true:false,
                user: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;
