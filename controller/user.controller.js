import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export let signUp = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        // validate the data
        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        // check if the user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        // hash the password
        let hashedPassword = await bcrypt.hash(password, 12);

        // create a new user
        let newUser = await User.create({
            userName,
            email,
            password: hashedPassword
        });


        res.status(201).json({
            message: `${newUser.userName} created successfully`,
            user: {
                userName: newUser.userName,
                email: newUser.email
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        // validate the data
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        // check if the user exists
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        // compare the password
        let isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        // generate a token
        let token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // 1 hour
        );

        // set the cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7days
        })
        res.status(200).json({
            message: "Login successful",
            user: {
                userName: existingUser.userName,
                email: existingUser.email
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
};

export let logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout successful"
    })
}



export let getUser = (req, res) => {
    res.json({
        message: "get all users"
    })
}

