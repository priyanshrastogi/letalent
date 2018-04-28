import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PostProposalModal from '../postproposalmodal';
import { incView } from '../../actions';

class JobDetailsPublic extends Component {

    componentDidMount() {
        if (this.props.job) {
            if (!this.props.viewedlist.includes(this.props.job._id))
                this.props.incView(this.props.job._id);
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
                            <div>
                                <span className="text-danger" style={{ fontWeight: 400 }}>
                                    <i className="material-icons">local_offer</i> {`${job.proposals.length} Proposals`}
                                </span>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-info" data-toggle="modal" data-target="#postProposalModal">Post A Proposal</button>
                            </div>
                            <PostProposalModal jobId={job._id} history={this.props.history}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return { viewedlist: state.viewedlist.list };
}

export default connect(mapStateToProps, { incView })(JobDetailsPublic);