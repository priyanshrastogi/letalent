import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchProposals } from '../../actions';
import ProposalDetailsModal from './proposaldetailsmodal';
import _ from 'lodash';

class JobDetailsPrivate extends Component {

    componentDidMount() {
        this.props.fetchProposals(this.props.job._id);
    }

    renderProposals() {
        return _.map(this.props.proposals, proposal => {
            return (
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle text-muted">A Proposal By</h6>
                            <h4 className="card-title">{proposal.proposalUser.name}</h4>
                            <p className="card-text">
                                Proposed Price: {proposal.proposedPrice}<br/>
                                Proposed Time: {proposal.daysToComplete} days
                            </p>
                            <p className="card-text"></p>
                            <a href="#" data-toggle="modal" data-target={`#${proposal._id}`} className="card-link">View Proposal</a>
                            <ProposalDetailsModal proposal={proposal} history={this.props.history}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {

        const { job } = this.props;

        return (
            <div>
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
                                <p style={{ fontWeight: 400 }}>{job.payType === 'fixed' ? "Fixed Pay" : "Hourly Pay"}</p>
                            </div>
                            <div style={{ marginBottom: '30px' }}>
                                <h4 className="title">Budget</h4>
                                <p style={{ fontWeight: 400 }}>{`Upto INR ${job.budget}`}</p>
                            </div>
                            <div style={{ marginBottom: '30px' }}>
                                <h4 className="title">{`You have received ${job.proposals.length} proposals.`}</h4>
                            </div>
                            <div style={{ marginBottom: '30px' }}>
                                <div className="row">
                                    {this.renderProposals()}
                                </div>
                            </div>                     
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { proposals: state.proposals };
}

export default connect(mapStateToProps, { fetchProposals })(JobDetailsPrivate);