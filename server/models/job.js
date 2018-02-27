var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jobAdditionalSchema = require('./jobAdditionalSchemas');

var jobSchema = new Schema({
    title: String,
    description: String,
    category: [String],
    skillsReq: [String],
    expectedDuration: Number, //In days
    moneyRangeStart: Number,
    moneyRangeEnd: Number,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    interestedPeople: [jobAdditionalSchema.interestSchema],
    
    workingUser: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
    startedOn: Date,
    finishedOn: Date,
    actualJobDuration: Number, //In Days
    jobFinished: { type: Boolean, default: false},
    finalAmount: [jobAdditionalSchema.finalAmountSchema],
    paid: {type: Boolean, default: false},
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);