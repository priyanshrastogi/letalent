import { FETCH_JOBS_WORKING } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_JOBS_WORKING:
            return _.mapKeys(action.payload, '_id');

        default:
            return state;
    }
}