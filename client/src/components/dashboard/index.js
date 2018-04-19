import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import DashboardForWork from './dashboardForWork';
import DashboardForHire from './dashboardForHire';

class Dashboard extends Component {

    render() {

        if(localStorage.getItem('userType')==='work') {
            return (
                <DashboardForWork />
            );
        }

        else if(localStorage.getItem('userType')==='hire') {
            return (
                <DashboardForHire />
            );
        }
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(Dashboard);