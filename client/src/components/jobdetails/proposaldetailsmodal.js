import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { acceptProposal } from '../../actions';

class ProposalDetailsModal extends Component {

    handleButton() {
        this.props.acceptProposal(this.props.proposal.job, this.props.proposal._id, () => {
            this.props.history.push(`/jobs/${this.props.proposal.job}/progress`);
        })
    }

    render() {

        const { proposal } = this.props //property added by Redux Form to handle form submit.

        return (
            <div className="modal fade" id={proposal._id} tabindex="-1" role="">
                <div className="modal-dialog modal-signup" role="document">
                    <div className="modal-content">
                        <div className="card card-signup card-plain">
                            <div className="modal-header">
                                <h5 className="modal-title card-title">Proposal By {proposal.proposalUser.name}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <i className="material-icons">clear</i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body">
                                    <div style={{ marginBottom: '30px' }}>
                                        <h4 className="title">Proposal</h4>
                                        <p style={{ fontWeight: 400 }}>{proposal.proposal}</p>
                                    </div>
                                    <div style={{ marginBottom: '30px' }}>
                                        <h4 className="title">Proposed Time: {proposal.daysToComplete} Days </h4>
                                        <h4 className="title">Proposed Price: {proposal.proposedPrice}</h4>
                                    </div>
                                    <div className="text-center">
                                        <Link style={{margin:'10px'}} to={`/@${proposal.proposalUser.username}`} target="_blank" className="btn btn-info">Visit Profile</Link>
                                        <button style={{margin:'10px'}} className="btn btn-info" onClick={this.handleButton.bind(this)}>Accept Proposal</button>
                                    </div>                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { acceptProposal })(ProposalDetailsModal);