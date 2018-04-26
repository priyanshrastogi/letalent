import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import Footer from './components/footer';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signup';
import SignOut from './components/signout';
import ForgotPassword from './components/forgotpassword';
import UserProfile from './components/userprofile';
import JobSearch from './components/jobsearch';
import JobDetails from './components/jobdetails';
import AddNewJob from './components/addnewjob';
import Page404 from './components/page404';
import Dashboard from './components/dashboard';
import { LOGIN_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if(token) {
    store.dispatch({ type: LOGIN_USER });
}

ReactDOM.render(<Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/logout" component={SignOut} />
                    <Route exact path="/forgotpassword" component={ForgotPassword} />
                    <Route exact path="/@:username" component={UserProfile} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/jobs" component={JobSearch} />
                    <Route exact path="/jobs/new" component={AddNewJob} />
                    <Route exact path="/jobs/:jobId" component={JobDetails} />
                    <Route component={Page404} />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
