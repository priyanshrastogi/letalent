import { FETCH_JOB_SUBMISSIONS } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_JOB_SUBMISSIONS:
            return _.mapKeys(action.payload, '_id');

        default:
            return state;
    }
}