var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: String,
    description: String,
    duration: String,
    technologyUsed: [String],
    link: String,
});

var workExperienceSchema = new Schema({
    company: String,
    designation: String,
    duration: String
});

var educationSchema = new Schema({
    school: String,
    gradYear: String,
    degree: String,
});

exports.projectSchema = projectSchema;
exports.workExperienceSchema = workExperienceSchema;
exports.educationSchema = educationSchema;