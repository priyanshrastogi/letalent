var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    amount: Number,
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    paidTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    paymentInitiated: {
        type: Boolean,
        default: true
    },
    userPaidToUs: {
        type: Boolean,
        default: false    
    },
    wePaidToUser: {
        type: Boolean,
        default: false
    },
    transactionIdForUser1: {
        type: Number
    },
    transactionIdForUser2: {
        type: Number
    },
     
});

module.exports = mongoose.model('Transaction', transactionSchema);