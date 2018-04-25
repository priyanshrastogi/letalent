import { ADD_TO_VIEWED_LIST } from '../actions/types';
import _ from 'lodash';

export default function (state = {list:[]}, action) {
    switch (action.type) {
        case ADD_TO_VIEWED_LIST:
            state.list.push(action.payload);
            return state;

        default:
            return state;
    }
}