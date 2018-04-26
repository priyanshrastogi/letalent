import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavBarDefault from '../../navbardefault';
import RenderJobsHire from './jobs';

class DashboardForHire extends Component {

    render() {
        return (
            <div>
                <NavBarDefault />
                <div className="card">
                    <div className="card-body">
                        <div className="card card-nav-tabs card-plain" style={{ marginTop: '70px' }}>
                            <div className="card-header card-header-danger">
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <ul className="nav nav-tabs" data-tabs="tabs">
                                            <li className="nav-item">
                                                <a className="nav-link active" href="#jobs" data-toggle="tab">Jobs</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#wallet" data-toggle="tab">Wallet</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="tab-content">
                                    <div className="tab-pane active" id="jobs">
                                        <RenderJobsHire />
                                    </div>
                                    <div className="tab-pane" id="proposals">
                                    </div>
                                    <div className="tab-pane" id="wallet">
                                        <div className="row">
                                            <div className="col-md-4 offset-md-4 text-center">
                                                <div class="card card-pricing bg-info">
                                                    <div class="card-body">
                                                        <h1 class="card-title">&#8377;0.00</h1>
                                                        <p class="card-description">
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(DashboardForHire);