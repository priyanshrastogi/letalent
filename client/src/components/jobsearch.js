import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavBarDefault from './navbardefault';
import JobSearchBar from './jobsearchbar';
import JobIndex from './jobindex';

class JobSearch extends Component {

    render() {

        if(this.props.authenticated) {
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
                                <JobIndex />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        else {
            return (
                <Redirect to={`/login?next=${this.props.location.pathname}`}/>
            )
        }
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(JobSearch);