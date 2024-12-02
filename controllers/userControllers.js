import userModel from "../models/userModel.js"; //Always add the file ext
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//LOGIN USER
const loginUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            res.status(401);
            res.json({success: false, message: "Invalid Credientials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success: false, message: "Invalid Credientials"});
        }

        const token = createToken(user._id);
        res.json({success: true, token, message: `Welcome back ${user.name}!`});
        console.log("User Successfully Logged In");
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error});
    }
};

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
};

//REGISTER USER
const reqisterUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        //Checking if user exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success: false, message: "User email already exist"});
        }
        //Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"});
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password."});
        }
        //Hashing User password
        const salt = await bcrypt.genSalt(10);
        const hashedPassowrd = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassowrd,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true, token, message: `Welcome onboard!`});
        console.log("New profile successfully created!");
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error});
    }
};

export {loginUser, reqisterUser};
