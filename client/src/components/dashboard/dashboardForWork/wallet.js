import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserWallet } from '../../../actions';


class Wallet extends Component {

    componentDidMount() {
        this.props.fetchUserWallet();
    }

    render() {
        return (
            <div>
                <div class="card-body">
                    <h1 class="card-title">&#8377; {this.props.wallet ? this.props.wallet.balance : '0.00'}</h1>
                    <p class="card-description">
                    </p>
                </div>                               
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { wallet: state.wallet };
}

export default connect(mapStateToProps, { fetchUserWallet })(Wallet);