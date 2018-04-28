var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionSchema = new Schema({
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    reviewUrl: {
        type: String
    },
    sourceUrl: {
        type: String
    },
    message: String,
    status: {type: String, default: 'pending', enum: ['pending','accepted']},
}, { timestamps: true });

var Submissions = mongoose.model('Submissions', submissionSchema);
module.exports = Submissions;