import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchJobs } from '../../../actions';
import _ from 'lodash';
import { FETCH_JOBS_POSTED } from '../../../actions/types';

class RenderJobsHire extends Component {

    componentDidMount() {
        this.props.fetchJobs({postedBy: localStorage.getItem('userId')}, FETCH_JOBS_POSTED);
    }

    render() {
        return(
            _.map(this.props.jobs, job => {
                return(
                    <div className="card">
                        <div className="card-body" style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                            <h6 className="card-category">
                                <span className="text-success">
                                    <i class="material-icons">date_range</i> {`Posted on ${job.createdAt}`}
                            </span>
                                <span>&nbsp; &nbsp; &nbsp; &nbsp; </span>
                                <span className="text-info">
                                    <i className="material-icons">local_offer</i> {job.category}
                            </span>
                            </h6>
                            <div className="row">
                                <div className="col-md-10">
                                    {job.status === 'pending' ?
                                        <h4 className="card-title"><Link to={`/jobs/${job._id}`}>{job.title}</Link></h4>
                                    :   <h4 className="card-title"><Link to={`/jobs/${job._id}/progress`}>{job.title}</Link></h4>}
                                </div>
                                { job.status === 'pending' ?
                                <div className="col-md-2">
                                    <h4 className="card-title text-warning">{`${job.proposals.length} Proposals`}</h4>
                                </div>
                                : job.status === 'started' ?
                                <div className="col-md-2">
                                    <h4 className="card-title text-info">In Progress</h4>
                                </div>
                                : job.status === 'submitted' ?
                                    <div className="col-md-2">
                                        <h4 className="card-title text-success">Work Submitted</h4>
                                    </div>
                                :
                                <div className="col-md-2">
                                    <h4 className="card-title text-success">Paid</h4>
                                </div>
                                }
                            </div>
                        </div>
                        <div className="card-footer" style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                            <p>{job.skillsReq.join(', ')}</p>
                        </div>
                    </div>
                )
            })
        )
    }
}

function mapStateToProps(state) {
    return { jobs: state.jobsposted };
}

export default connect(mapStateToProps, { fetchJobs })(RenderJobsHire);