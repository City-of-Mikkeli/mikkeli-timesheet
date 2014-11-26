var mongoose = require('mongoose');

var priceSchema = mongoose.Schema({
	user_id: String,
	name: String,
	price: Number
});

module.exports = mongoose.model('Price', priceSchema);