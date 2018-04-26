import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavBarDefault from '../navbardefault';
import { fetchJob } from '../../actions';
import JobDetailsPrivate from './private';
import JobDetailsPublic from './public';

class JobDetails extends Component {

    componentDidMount() {
        if (!this.props.job) {
            this.props.fetchJob(this.props.match.params.jobId);
        }
    }

    render() {

        const { job } = this.props;

        if (this.props.authenticated) {

            if(job) {
                if (job.postedBy === localStorage.getItem('userId')) {
                    return (
                        <div>
                            <NavBarDefault />
                            <JobDetailsPrivate job={job} history={this.props.history}/>
                        </div>
                    )
                }

                else {
                    return (
                        <div>
                            <NavBarDefault />
                            <JobDetailsPublic job={job}/>
                        </div>
                    );
                }
            }

            else {
                return (
                    <div>
                        <NavBarDefault />
                        <h5 className="text-center">Loading...</h5>
                    </div>
                )
            }

        }

        else {
            return (
                <Redirect to={`/login?next=${this.props.location.pathname}`} />
            )
        }
    }
}

function mapStateToProps(state, ownProps) {
    return { authenticated: state.auth.authenticated, job: state.jobs[ownProps.match.params.jobId] };
}

export default connect(mapStateToProps, { fetchJob })(JobDetails);