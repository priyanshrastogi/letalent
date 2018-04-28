import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth'
import userProfileReducer from './userprofile';
import jobsReducer from './jobs';
import viewedListReducer from './viewedlist';
import jobsPostedReducer from './jobsposted';
import jobsWorkingReducer from './jobsworking';
import proposalsReducer from './proposals';
import jobsubmissionReducer from './jobsubmission';
import walletReducer from './userwallet';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    userprofile: userProfileReducer,
    jobs: jobsReducer,
    viewedlist: viewedListReducer,
    jobsposted: jobsPostedReducer,
    jobsworking: jobsWorkingReducer,
    proposals: proposalsReducer,
    jobsubmissions: jobsubmissionReducer,
    wallet: walletReducer
});

export default rootReducer;