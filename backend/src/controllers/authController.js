const {User} = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const signup = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const flag = validator.isStrongPassword(password);
        if(!flag){
            throw new Error("Please enter a strong password");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // let createdUser = await User.insertOne({username, email, password: hashedPassword});
        let newUser = new User({username, email, password: hashedPassword});
        let createdUser = await newUser.save();
        const token = jwt.sign({_id: createdUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie("token", token);
        res.status(200).json({"msg": "User registered successfully", data: createdUser});
    } catch (error) {
       res.status(400).json({"msg": error.message}); 
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const FoundUser = await User.findOne({username});
        if(!FoundUser){
            throw new Error("User does not exist");
        }
        const flag = await bcrypt.compare(password, FoundUser.password);
        if(!flag){
            throw new Error("Invalid Password");
        }
        const token = jwt.sign({_id: FoundUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie("token", token);
        res.status(200).json({"msg": "User logged in successfully", data: FoundUser})
    } catch (error) {
        res.status(400).json({"msg": error.message});
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        })
        res.status(200).json({"msg": "User logged out"})
    } catch (error) {
        res.json({"msg": error.message});
    }
}

module.exports = {signup, login, logout}