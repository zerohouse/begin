var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/picks');
module.exports = mongoose;
