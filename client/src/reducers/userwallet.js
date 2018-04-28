import { FETCH_USER_WALLET } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_USER_WALLET:
            return action.payload

        default:
            return state;
    }
}