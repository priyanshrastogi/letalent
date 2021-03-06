var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userAdditionalSchemas = require('./userAdditionalSchemas');

var userProfileSchema = new Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
    username: String,
    
    phone: String,
    
    location: {
        lat : Number,
        long: Number,
        locationName: String
    },
    
    bio: String,
    
    tagline: String,

    dateOfBirth: Date,

    activatedAccount: { type: Boolean, default: false},

    verifiedAccount: { type: Boolean, default: false},

    perHourRate: { type: Number, default: 0 },

    socialLinks: {
        facebook: String,
        twitter: String,
        linkedin: String,
        github: String,
        behance: String,
        pinterest: String,
        blog: String,
        website: String,
        medium: String,
        codepen: String
    },

    verifications: {
        email: { type: Boolean, default: false },
        mobile: { type: Boolean, default:false },
        govtId: { type: Boolean, default:false },
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