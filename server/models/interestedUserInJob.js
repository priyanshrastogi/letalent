var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interestSchema = new Schema({
    interestedUser: {
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
    status: {type: String, default: "pending"},
}, { timestamps: true });


module.exports = mongoose.model('InterestedUserInJob', interestSchema);