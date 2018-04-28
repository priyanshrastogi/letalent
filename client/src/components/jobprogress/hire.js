import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Payments from '../payments';
import _ from 'lodash';
import { fetchSubmission } from '../../actions';
 
class JobProgressHire extends Component {

    componentDidMount() {
        this.props.fetchSubmission(this.props.job._id);
    }

    renderContent() {
        const { job } = this.props;

        if(job.status === 'started') {
            return (
                <div>
                    <h3 className="text-center title">{job.title}</h3>

                    <div className="row">
                        <div className="col-md-6">
                            <p style={{fontWeight: 400, marginTop: '50px'}}>{`${job.workingUser.name} is working on this job.`}</p>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                </div>
            )
        }

        else if(job.status === 'submitted') {
            return (
                <div>
                    <h3 className="text-center title">{job.title}</h3>
                    <div className="row">
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-6">
                        </div>
                    </div>
                    <h5 className="text-center" style={{ fontWeight:400, marginTop: '50px' }}>{`${job.workingUser.name} has submit their work for this job.`}</h5>
                    <div className="text-center">
                        {console.log(this.props.submissions)}
                        {_.map(this.props.submissions, submission => { return (
                            <div>
                                <p style={{fontWeight: 400, color: 'grey'}}>Submission ID: {submission._id}</p>
                                <a target="_blank" className="btn btn-success" href={submission.reviewUrl}>Review Work</a>
                                <p style={{fontWeight: 400, color: 'grey', marginTop:'10px'}}>The Source Link is Locked. If you like the work, you can make payment to unlock source link.</p>
                            </div>
                        )})}
                    </div>
                    <div className="text-center" style={{marginTop: '50px'}}>
                        <Payments payTo={job.workingUser.name} amount={job.finalAmount * 100} email={job.postedBy.email} history={this.props.history} forUser={job.workingUser._id} forJob={job._id}/>
                    </div>
                </div>
            )
        }

        if(job.status === 'pending') {
            return (
                <div>
                    <h3 className="text-center title">{job.title}</h3>
                    <h3 className="text-center title">Job hasn't been started yet.</h3>
                </div>
            )
        }


    }

    render() {

        const { job } = this.props;

        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8 offset-md-2" style={{ marginTop: '50px' }}>
                                {this.renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { submissions: state.jobsubmissions };
}

export default connect(mapStateToProps, { fetchSubmission })(JobProgressHire);