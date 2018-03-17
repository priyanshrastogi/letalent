import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(<Provider store={store}>
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/signout" component={SignOut}/>
                    <Route exact path="/poolreqs/new" component={NewPoolRequest}/>
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
