import { FETCH_JOBS, FETCH_AND_APPEND_JOBS, FETCH_JOB, POST_PROPOSAL } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_JOBS:
            return _.mapKeys(action.payload, '_id');

        case FETCH_AND_APPEND_JOBS:
            let data = _.mapKeys(action.payload, '_id');
            return { ...state, data};

        case FETCH_JOB:
            return { ...state, [action.payload._id]: action.payload}

        case POST_PROPOSAL:
            state[action.payload._id] = action.payload;
            //console.log(state[action.payload._id]);
            return state;

        default:
            return state;
    }
}