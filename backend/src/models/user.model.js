const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(val){
            const flag = validator.isEmail(val);
            if(!flag){
                throw new Error("Please enter a valid email");
            }
        }
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 6
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
module.exports = {User}

