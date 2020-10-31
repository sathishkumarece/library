import {ERRORS} from '../constants/types';

export default (state={}, action) => {
    switch(action.type){
        case ERRORS:
            return action.payload
        default:
            return state
    }
}