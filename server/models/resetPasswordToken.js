var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resetPasswordTokenSchema = new Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, );

module.exports = mongoose.model('ResetPassowrdToken', resetPasswordTokenSchema);