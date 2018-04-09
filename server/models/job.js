var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jobAdditionalSchema = require('./jobAdditionalSchemas');

var jobSchema = new Schema({
    title: String,
    description: String,
    category: [String],
    skillsReq: [String],
    payType: String, //Hour based or Fixed pay namely 'Hourly' or 'Fixed'
    fixedPayPrice: Number,
    estimatedDuration: Number, //In hours
    perHourPrice: Number,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    proposals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal'
    }],
    workingUser: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
    viewsNumber: {type: Number, default: 0},
    jobFinished: { type: Boolean, default: false },
    startedOn: Date,
    finishedOn: Date,
    actualJobDuration: Number, //In hours
    finalAmount: [jobAdditionalSchema.finalAmountSchema],
    paid: {type: Boolean, default: false},
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    tag: {type: String, default: null},
    jobRatingByFreelancer: jobAdditionalSchema.ratingSchema,
}, { timestamps: true });

var Jobs = mongoose.model('Job', jobSchema);
module.exports = Jobs;