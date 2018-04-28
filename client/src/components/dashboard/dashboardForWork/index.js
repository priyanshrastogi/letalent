import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavBarDefault from '../../navbardefault';
import RenderJobsWork from './jobs';
import Wallet from './wallet';

class DashboardForWork extends Component {

    renderProposalList() {
        return (
            <div>
                <div className="card">
                    <div className="card-body" style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                        <h6 className="card-category">
                            <span className="text-danger">
                                <i className="material-icons">trending_up</i> Trending
                            </span>
                            <span>&nbsp; &nbsp; &nbsp; &nbsp; </span>
                            <span className="text-info">
                                <i className="material-icons">local_offer</i> Web Development
                            </span>
                            <span>&nbsp; &nbsp; &nbsp; &nbsp; </span>
                            <span className="text-success">
                                <i class="material-icons">date_range</i> Sent 01 March 2018
                            </span>
                        </h6>
                        <div className="row">
                            <div className="col-md-10">
                                <h4 className="card-title"><a href="#pablo">Build an E-commerce Website</a></h4>
                            </div>
                            <div className="col-md-2">
                                <h4 className="card-title"><a href="#">View Proposal</a></h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                        <p>Node.js, React, Express, MongoDB, REST APIs</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body" style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                        <h6 className="card-category">
                            <span className="text-danger">
                                <i className="material-icons">trending_up</i> Trending
                            </span>
                            <span>&nbsp; &nbsp; &nbsp; &nbsp; </span>
                            <span className="text-info">
                                <i className="material-icons">local_offer</i> Graphic Design
                            </span>
                            <span>&nbsp; &nbsp; &nbsp; &nbsp; </span>
                            <span className="text-success">
                                <i class="material-icons">date_range</i> Sent 01 March 2018
                            </span>
                        </h6>
                        <div className="row">
                            <div className="col-md-10">
                                <h4 className="card-title"><a href="#pablo">Design a logo for an E-commerce Website</a></h4>
                            </div>
                            <div className="col-md-2">
                                <h4 className="card-title"><a href="#">View Proposal</a></h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                        <p>Adobe Photoshop, Graphic Design</p>
                    </div>
                </div>
            </div>
        )
    }

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
                                                <a className="nav-link" href="#proposals" data-toggle="tab">Proposals</a>
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
                                        <RenderJobsWork />
                                    </div>
                                    <div className="tab-pane" id="proposals">
                                        {this.renderProposalList()}
                                    </div>
                                    <div className="tab-pane" id="wallet">
                                        <div className="row">
                                            <div className="col-md-4 offset-md-4 text-center">
                                                <div class="card card-pricing bg-info">
                                                    <Wallet />
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
    return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(DashboardForWork);