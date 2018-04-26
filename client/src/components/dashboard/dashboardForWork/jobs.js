import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchJobs } from '../../../actions';
import _ from 'lodash';
import { FETCH_JOBS_WORKING } from '../../../actions/types';

class RenderJobsWork extends Component {

    componentDidMount() {
        this.props.fetchJobs({ workingUser: localStorage.getItem('userId') }, FETCH_JOBS_WORKING);
    }

    render() {
        return (
            _.map(this.props.jobs, job => {
                return (
                    <div className="card">
                        <div className="card-body" style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                            <h6 className="card-category">
                                <span className="text-danger">
                                    <i class="material-icons">date_range</i> Due 05 March 2018
                            </span>
                            </h6>
                            <div className="row">
                                <div className="col-md-10">
                                    <h4 className="card-title"><a href="#pablo">{job.title}</a></h4>
                                </div>
                                <div className="col-md-2">
                                    {job.jobFinished === true ? <h4 className="card-title text-success">Job Finished</h4>
                                    : <h4 className="card-title text-info">In Progress</h4>}
                                </div>
                            </div>
                        </div>
                        <div className="card-footer" style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                            <p>Job Posted By <strong>Pulkit Luthra</strong></p>
                        </div>
                    </div>
                )
            })
        )
    }
}

function mapStateToProps(state) {
    return { jobs: state.jobsworking };
}

export default connect(mapStateToProps, { fetchJobs })(RenderJobsWork);