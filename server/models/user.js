var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userAdditionalSchemas = require('./userAdditionalSchemas');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
    },

    location: [{
        lat : Number,
        long: Number,
        locationName: String
    }],

    bio: {
        type: String
    },

    tagline: {
        type: String
    },

    dateOfBirth: {
        type: Date
    },

    activatedAccount: {
        type: Boolean,
        default: false
    },

    verifiedAccount: {
        type: Boolean,
        default: false,
    },

    verifications: {
        email: { type: Boolean, default: false },
        mobile: { type: Boolean, default:false },
        govtId: { type: Boolean, default:false },
        paymentCard: { type: Boolean, default:false },
    },

    education: [userAdditionalSchemas.educationSchema],

    projects: [userAdditionalSchemas.projectSchema],

    workExperience: [userAdditionalSchemas.workExperienceSchema],

    skills: [String],

    talentCategory: [String],

    ratings: [userAdditionalSchemas.ratingSchema],

    overAllRating: Number,

}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);