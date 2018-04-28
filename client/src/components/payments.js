import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { stripePublicKey } from '../config';
import { handlePayment } from '../actions';

class Payments extends Component {

    render() {
        return (
            <StripeCheckout
            name="Letalent"
            description={`Pay to ${this.props.payTo}`}
            email={this.props.email}
            amount={this.props.amount}
            token={token => this.props.handlePayment(token, this.props.amount, `Pay to ${ this.props.payTo }`, this.props.forUser, this.props.forJob, () => {
                    this.props.history.push(`/jobs/${this.props.forJob}/progress`);
                })}
            currency="INR"
            stripeKey={stripePublicKey}>
            <button className="btn btn-info">Pay to {this.props.payTo}</button>
            </StripeCheckout>
        );
    };
}

export default connect(null, { handlePayment })(Payments);