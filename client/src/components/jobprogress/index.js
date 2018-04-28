import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavBarDefault from '../navbardefault';
import { fetchJob } from '../../actions';
import JobProgressWork from './work';
import JobProgressHire from './hire';

class JobProgress extends Component {

    componentWillMount() {
        this.props.fetchJob(this.props.match.params.jobId);
    }

    render() {

        const { job } = this.props;

        if (this.props.authenticated) {
            if (job) {
                console.log(job.workingUser);
                if (job.postedBy._id === localStorage.getItem('userId')) {
                    return (
                        <div>
                            <NavBarDefault />
                            <JobProgressHire job={job} history={this.props.history}/>
                        </div>
                    )
                }

                else if(job.workingUser._id === localStorage.getItem('userId')) {
                    return (
                        <div>
                            <NavBarDefault />
                            <JobProgressWork job={job} history={this.props.history}/>
                        </div>
                    );
                }

                else {
                    return (
                        <div>
                            <NavBarDefault />
                            <h5 className="text-center">Unauthorized</h5>
                        </div>
                    )
                }
            }

            else {
                return (
                    <div>
                        <NavBarDefault />
                        {"Loading" +console.log(job)}
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

export default connect(mapStateToProps, { fetchJob })(JobProgress);