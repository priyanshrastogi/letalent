var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var finalAmountSchema = new Schema({
    amount: Number,
    approvedByJobPoster: {type: Boolean, default: false},
    approvedByWorker: {type: Boolean, default: false}
});

var ratingSchema = new Schema({
    ratingVal: Number,
    review: String
});

exports.finalAmountSchema = finalAmountSchema;
exports.ratingSchema = ratingSchema;