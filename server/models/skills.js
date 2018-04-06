var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skillSchema = new Schema({
    skill: String,
});

module.exports = mongoose.model('Skill', skillSchema);