var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proposalSchema = new Schema({
    proposalUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    proposal: {
        type: String
    },
    daysToComplete: Number,
    proposedPrice: Number,
    status: {type: String, default: "pending"},
}, { timestamps: true });


var Proposals = mongoose.model('Proposal', proposalSchema);
module.exports = Proposals;
