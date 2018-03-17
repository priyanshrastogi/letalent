var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    technologyUsed: [String],
    link: String,
    ongoing: Boolean
}, { timestamps: true });

var workExperienceSchema = new Schema({
    company: String,
    designation: String,
    statDate: Date,
    endDate: Date,
    current: Boolean
}, { timestamps: true });

var educationSchema = new Schema({
    school: String,
    gradYear: String,
    degree: String,
    specialization: String,
    current: Boolean
}, { timestamps: true });

exports.projectSchema = projectSchema;
exports.workExperienceSchema = workExperienceSchema;
exports.educationSchema = educationSchema;