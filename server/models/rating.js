var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema({
    forUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    byUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    forjob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    rating: {
        type: Number
    },
    review: {
        type: String
    },
}, { timestamps: true });


module.exports = mongoose.model('Rating', ratingSchema);