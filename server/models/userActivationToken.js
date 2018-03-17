var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userActivationTokenSchema = new Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, );

module.exports = mongoose.model('UserActivationToken', userActivationTokenSchema);