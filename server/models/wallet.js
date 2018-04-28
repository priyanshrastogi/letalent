var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var walletSchema = new Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    balance: { type: Number, default: 0 },

    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]

}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);