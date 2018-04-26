import { FETCH_PROPOSALS } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_PROPOSALS:
            return _.mapKeys(action.payload, '_id');

        default:
            return state;
    }
}