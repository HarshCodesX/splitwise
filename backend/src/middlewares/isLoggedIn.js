const jwt = require("jsonwebtoken");
const {User} = require("../models/user.model");

const isLoggedIn = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token || token === null){
            return res.status(401).json({ msg: "No token provided. Please login." });
        }
        const obj = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await User.findOne({_id: obj._id});
        if(!foundUser){
            throw new Error("Please login");
        }
        req.User = foundUser;
        req.Id = obj._id;
        next();
    } catch (error) {
        res.status(400).json({"msg from middleware": error.message});
    }
}

module.exports = {isLoggedIn}