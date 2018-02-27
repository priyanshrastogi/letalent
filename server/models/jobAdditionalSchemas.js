var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interestSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    interestedOn: Date,
    pendingForReview: {type: Boolean, default: true},
    acceptedForJob: {type: Boolean, default: false}
});

var finalAmountSchema = new Schema({
    amount: Number,
    approvedByJobPoster: {type: Boolean, default: false},
    approvedByWorker: {type: Boolean, default: false}
});

exports.interestSchema = interestSchema;
exports.finalAmountSchema = finalAmountSchema;