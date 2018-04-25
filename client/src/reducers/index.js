import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth'
import userProfileReducer from './userprofile';
import jobsReducer from './jobs';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    userprofile: userProfileReducer,
    jobs: jobsReducer
});

export default rootReducer;