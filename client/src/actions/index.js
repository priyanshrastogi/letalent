import axios from 'axios';
import { reset } from 'redux-form';
import { LOGIN_USER, LOGOUT_USER, AUTH_ERROR, POST_JOB, FETCH_JOBS, FETCH_JOB, FETCH_AND_APPEND_JOBS, FETCH_USER_PROFILE, POST_PROPOSAL, FETCH_SELFUSER_PROFILE, ADD_USER_EDUCATION, ADD_USER_EXPERIENCE, ADD_USER_PROJECT } from './types';

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
            successAlert('Login Successful')
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

export function updateUser(values, formName, callback) {
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

export function fetchJobs(keyword) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/jobs`)
        .then((res) => {
            dispatch({type: FETCH_JOBS, payload: res.data});
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

export function postProposal(jobId) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/jobs/${jobId}/proposals`, null, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            dispatch({ type: POST_PROPOSAL, payload: res.data });
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