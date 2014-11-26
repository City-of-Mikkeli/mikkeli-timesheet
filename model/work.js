var mongoose = require('mongoose');

var workSchema = mongoose.Schema({
        hours : Number,
        description : String,
        user_id : String,
        price_id : String,
        project_id: String,
        day: Number,
        costcenter_id: String,
        customer_id: String,
        locked: {type: Boolean, default:false}
});

module.exports = mongoose.model('Work', workSchema);