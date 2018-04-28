import axios from 'axios';
import { reset } from 'redux-form';
import qs from 'qs';
import { LOGIN_USER, LOGOUT_USER, AUTH_ERROR, POST_JOB, FETCH_JOBS, FETCH_JOB, FETCH_AND_APPEND_JOBS, FETCH_USER_PROFILE, POST_PROPOSAL,
    FETCH_PROPOSALS, ADD_USER_EDUCATION, ADD_USER_EXPERIENCE, ADD_USER_PROJECT, ADD_TO_VIEWED_LIST, UPDATE_JOB_PROGRESS,
    FETCH_JOB_PROGRESS, FETCH_JOB_SUBMISSIONS, FETCH_USER_WALLET } from './types';

const ROOT_URL = 'http://localhost';

//User Related Actions

export function loginUser(cred, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/users/login`, cred)
        .then( (res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('name', res.data.user.name);
            localStorage.setItem('userId', res.data.user._id);
            localStorage.setItem('userType', res.data.user.userType);
            dispatch({ type: LOGIN_USER });
            callback();
        })
        .catch((error) => {
            
            if (error.response) {
                if(error.response.status === 401) {
                    showError('Invalid Username or Password');
                }
                else if (error.response.status === 500) {
                    showError('Internal Server Error. Please Try after Some Time');
                }
            }
            
            else if(error.request) {
                showError('No Internet Connection');
            }

        });
    }
}

export function logOutUser(callback) {
    return function(dispatch) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        localStorage.removeItem('userType');
        dispatch({ type: LOGOUT_USER });
        callback();
    }
}

export function signUpUser(cred, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/users/signup`, cred)
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user._id);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('name', res.data.user.name);
            localStorage.setItem('userType', res.data.user.userType);
            dispatch({ type: LOGIN_USER });
            callback();
        })
        .catch((error) => {
            
            if (error.response) {
                showError('Username already exists');
            }

            else if (error.request) {
                showError('No Internet Connection');
            }

        });
    }
}

export function fetchUserProfile(username) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/users/${username}`)
        .then((res) => {
            dispatch({type: FETCH_USER_PROFILE, payload: res.data});
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function addUserEducation(values, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/users/education`, values, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            dispatch({type: FETCH_USER_PROFILE, payload: res.data});
            dispatch(reset('AddEducationForm'));
            callback();
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function addUserExperience(values, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/users/workexperience`, values, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            dispatch({type: FETCH_USER_PROFILE, payload: res.data});
            dispatch(reset('AddExperienceForm'));
            callback();
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function addUserProject(values, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/users/projects`, values, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            dispatch({type: FETCH_USER_PROFILE, payload: res.data});
            dispatch(reset('AddProjectForm'));
            callback();
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function updateUserProfile(values, formName, callback) {
    return function(dispatch) {
        axios.put(`${ROOT_URL}/users`, values, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            dispatch({type: FETCH_USER_PROFILE, payload: res.data});
            dispatch(reset(formName));
            callback();
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function fetchUserWallet() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/users/wallet`, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            dispatch({type: FETCH_USER_WALLET, payload: res.data});
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

// Jobs Related Actions

export function postJob(values, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/jobs`, values, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            callback(reset('AddNewJobForm'))
            callback().push(`/jobs/${res.data._id}`);
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function fetchJobs(query, actionType) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/jobs?${qs.stringify(query)}`)
        .then((res) => {
            dispatch({type: actionType, payload: res.data});
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function fetchJob(jobId) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/jobs/${jobId}`)
        .then((res) => {
            dispatch({type: FETCH_JOB, payload: res.data});
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function postProposal(jobId, proposal, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/jobs/${jobId}/proposals`, proposal, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            dispatch({ type: POST_PROPOSAL, payload: res.data });
            successAlert('Proposal Posted Successfully')
            callback();
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function fetchProposals(jobId) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/jobs/${jobId}/proposals`)
        .then((res) => {
            dispatch({ type: FETCH_PROPOSALS, payload: res.data });
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function acceptProposal(jobId, proposalId, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/jobs/${jobId}/proposals/${proposalId}/accept`, null, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}`}
        })
        .then((res) => {
            callback();
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function incView(jobId) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/jobs/${jobId}/incv`)
        .then((res) => {
            dispatch({type: ADD_TO_VIEWED_LIST, payload: jobId});
        })
    }
}

export function updateProgress(jobId, data, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/jobs/${jobId}/progress`, data, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}`}
        })
        .then((res) => {
            dispatch({type: UPDATE_JOB_PROGRESS, payload: res.data})
            callback();
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function fetchProgress(jobId) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/jobs/${jobId}/progress`)
        .then((res) => {
            dispatch({type: FETCH_JOB_PROGRESS, payload: res.data});
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

export function submitJob(jobId, data, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/jobs/${jobId}/submit`, data, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}`}
        })
        .then((res) => {
            callback();
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}


export function fetchSubmission(jobId) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/jobs/${jobId}/submissions`)
        .then((res) => {
            dispatch({type: FETCH_JOB_SUBMISSIONS, payload: res.data})
        })
        .catch((error) => {    
            if (error.response) {
                showError('Some Error Occured!');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }
        });
    }
}

/**
 * Handling Payments
 */
export function handlePayment(token, amount, description, forUser, forJob, callback) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/api/stripe`, {token, amount, description, forUser, forJob}, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            callback();
        })
        .catch((error) => {
            if (error.response) {
                showError('Payment Failed');
            }
            else if (error.request) {
                showError('No Internet Connection');
            }                       
        })
    }
}

 /**
  * Error and Success Alerts
  */
function showError(error) {
    window.$.notify({
        message: error
    }, {
            type: 'danger',
            delay: 3000,
            placement: {
                from: 'top',
                align: 'center'
            },
        });
}

function successAlert(msg) {
    window.$.notify({
        message: msg
    }, {
            type: 'success',
            delay: 3000,
            placement: {
                from: 'top',
                align: 'right'
            },
        });
}