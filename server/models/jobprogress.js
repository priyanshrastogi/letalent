var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var progressSchema = new Schema({
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    percent: {Number},
    message: String,
}, { timestamps: true });

var JobProgress = mongoose.model('JobProgress', progressSchema);
module.exports = JobProgress;