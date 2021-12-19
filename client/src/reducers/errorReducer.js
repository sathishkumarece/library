import {ERRORS} from '../constants/types';

const errorReducer = (state={}, action) => {
    switch(action.type){
        case ERRORS:
            return action.payload
        default:
            return state
    }
}

export default errorReducer;