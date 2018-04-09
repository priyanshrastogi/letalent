var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userAdditionalSchemas = require('./userAdditionalSchemas');

var userProfileSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

    perHourRate: {
        type: Number,
        default: 0
    },

    socialLinks: {
        facebook: String,
        twitter: String,
        linkedin: String,
        github: String,
        behance: String,
        pinterest: String,
        instagram: String,
        blog: String,
        website: String,
        other: [{
            platform: String,
            url: String
        }]
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

    overAllRating: Number,

    ratingCount: Number

}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);