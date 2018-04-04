import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavBarDefault from './navbardefault';
import JobSearchBar from './jobsearchbar';

class JobSearch extends Component {

    renderJobList() {
        return (
            <div>
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-category">
                            <span className="text-danger">
                                <i class="material-icons">trending_up</i> Trending
                            </span>
                            <span>&nbsp; &nbsp; &nbsp; &nbsp; </span>
                            <span className="text-info">
                                <i class="material-icons">local_offer</i> Graphic Design
                            </span>
                        </h6>
                        <div className="row">
                            <div className="col-md-10">
                                <h4 class="card-title"><a href="#pablo">Design a logo for an E-commerce Website</a></h4>
                            </div>
                            <div className="col-md-2">
                                <h4 class="card-title"><a href="#pablo">From &#8377;1500/hr</a></h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <p>Adobe Photoshop, Graphic Design</p>
                        <div class="stats ml-auto">
                            <p>15 Proposals</p>    
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-category">
                            <span className="text-danger">
                                <i class="material-icons">whatshot</i> Hot
                            </span>
                            <span>&nbsp; &nbsp; &nbsp; &nbsp; </span>
                            <span className="text-info">
                                <i class="material-icons">local_offer</i> Web Development
                            </span>
                        </h6>
                        <div className="row">
                            <div className="col-md-10">
                                <h4 class="card-title"><a href="#pablo">Make A Dynamic Personal Website</a></h4>
                            </div>
                            <div className="col-md-2">
                                <h4 class="card-title"><a href="#pablo">From &#8377;10000</a></h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <p>React, Node.js, Express, MongoDB</p>
                        <div class="stats ml-auto">
                            <p>5 Proposals</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <NavBarDefault />
                <div class="card">
                    <div class="card-body">
                        <div className="row">
                            <div className="col-md-8 offset-md-2" style={{ marginTop: '30px' }}>
                                <h3 className="text-center title">Top Jobs for You</h3>
                                <JobSearchBar />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 d-none d-sm-block" style={{ paddingTop: '20px' }}>
                                <div class="card card-nav-tabs">
                                    <p class="card-header card-header-info text-center">Filters</p>
                                    <div class="card-body">
                                        <p>Here are some fiters</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9" style={{ paddingTop: '20px' }}>
                                <ul className="list-group list-group-flush">
                                    {this.renderJobList()}
                                </ul>
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

export default connect(mapStateToProps, null)(JobSearch);