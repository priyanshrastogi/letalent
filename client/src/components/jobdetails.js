import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavBarDefault from './navbardefault';
import PostProposalModal from './postproposalmodal';
import { fetchJob } from '../actions'

class JobDetails extends Component {

    componentDidMount() {
        if(!this.props.job) {
            this.props.fetchJob(this.props.match.params.jobId);
        }
    }

    render() {

        const { job } = this.props;

        if(this.props.authenticated) {

            if(this.props.job) {
                return (
                    <div>
                        <NavBarDefault />
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8 offset-md-2" style={{ marginTop: '50px' }}>
                                        <h3 className="text-center title">{job.title}</h3>
                                    </div>
                                </div>
                                <div className="container">
                                    <div style={{ marginBottom: '30px' }}>
                                        <h4 className="title">Description</h4>
                                        <p style={{ fontWeight: 400 }}>{job.description}</p>
                                    </div>
                                    <div style={{ marginBottom: '30px' }}>
                                        <h4 className="title">Skills Required</h4>
                                        <p style={{ fontWeight: 400 }}>{job.skillsReq.join(", ")}</p>
                                    </div>
                                    <div style={{ marginBottom: '30px' }}>
                                        <h4 className="title">Pay Type</h4>
                                        <p style={{ fontWeight: 400 }}>{ job.payType === 'fixed' ? "Fixed Pay" : "Hourly Pay"}</p>
                                    </div>
                                    <div style={{ marginBottom: '30px' }}>
                                        <h4 className="title">Budget</h4>
                                        <p style={{ fontWeight: 400 }}>{`Upto INR ${job.budget}`}</p>
                                    </div>
                                    <div>
                                        <span className="text-danger" style={{ fontWeight: 400 }}>
                                            <i className="material-icons">local_offer</i> {`${job.proposals.length} Proposals`}
                                </span>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-info" data-toggle="modal" data-target="#postProposalModal">Post A Proposal</button>
                                    </div>
                                    <PostProposalModal />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            else {
                return (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                );
            }
        }

        else {
            return (
                <Redirect to={`/login?next=${this.props.location.pathname}`}/>
            )
        }
    }
}

function mapStateToProps(state, ownProps) {
    return { authenticated: state.auth.authenticated, job: state.jobs[ownProps.match.params.jobId] };
}

export default connect(mapStateToProps, { fetchJob })(JobDetails);