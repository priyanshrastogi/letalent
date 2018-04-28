import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import NavBarDefault from './navbardefault';
import JobSearchBar from './jobsearchbar';
import { fetchJobs } from '../actions';
import { FETCH_JOBS } from '../actions/types';

class JobIndex extends Component {

    componentDidMount() {
        this.props.fetchJobs({status: 'pending'}, FETCH_JOBS);
    }

    renderJobList() {
        return _.map(this.props.jobs, job => {
            return (
                <div>
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-category">
                                {job.tag === 'Trending' ? <span><span className="text-danger"><i class="material-icons">trending_up</i> Trending </span><span>&nbsp; &nbsp; &nbsp; &nbsp; </span></span>: '' }
                                <span className="text-info">
                                    <i class="material-icons">local_offer</i> {job.category}
                            </span>
                            </h6>
                            <div className="row">
                                <div className="col-md-10">
                                    <h4 class="card-title"><Link to={`/jobs/${job._id}`}>{job.title}</Link></h4>
                                </div>
                                <div className="col-md-2">
                                    <h4 class="card-title">Upto &#8377; {job.budget}</h4>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <p>{job.skillsReq.join(", ")}</p>
                            <div class="stats ml-auto">
                                <p>{`${job.proposals.length} Proposals`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="col-md-9" style={{ paddingTop: '20px' }}>
                <ul className="list-group list-group-flush">
                    {this.renderJobList()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { jobs: state.jobs };
}

export default connect(mapStateToProps, { fetchJobs })(JobIndex);