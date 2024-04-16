const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema(
    {
    name: String,
    email: String,
    password: String,
    location: String,
    pfp: String,
    registeredEvents: [{
        title: String,
        start: Date,
        end: Date,
    }]
    }
)

module.exports = mongoose.model('user', userSchema);