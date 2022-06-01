const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        Member: {
            type: Number,
            default: 1984
        },
        RestrictedMember: Number,
        Advertiser: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);