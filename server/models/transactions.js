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
    stripeTransactionId: {
        type: String
    }
     
});

module.exports = mongoose.model('Transaction', transactionSchema);