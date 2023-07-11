const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone Number is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model('UserModel', userSchema);
module.exports = userModel;