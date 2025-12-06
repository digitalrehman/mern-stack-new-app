import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/clodinary.js";

export let signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    // validate the data
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    // hash the password
    let hashedPassword = await bcrypt.hash(password, 12);

    // create a new user
    let newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: `${newUser.name} created successfully`,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export let login = async (req, res) => {
  try {
    let { email, password } = req.body;
    // validate the data
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // check if the user exists
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    // compare the password
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
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
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(201).json({
      message: "Login successful",
      user: {
        ...existingUser._doc,
        password: "*****",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export let logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logout successful",
  });
};

export let getUserById = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "User id is required",
      });
    }
    let findUser = await User.findById(id).select("-password");
    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      user: findUser,
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export let updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let { name, bio, password } = req.body;
    let file = req.file;
    
    let findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    if (name) findUser.name = name;
    if (bio) findUser.bio = bio;
    if (password) {
      let hashedPassword = await bcrypt.hash(password, 12);
      findUser.password = hashedPassword;
    }
    if (file) {
      let result = await cloudinary.uploader.upload(file.path, {
        folder: "profile_pictures",
      });
      findUser.image = result.secure_url;
    }
    await findUser.save();
    res.status(200).json({
      message: "User updated successfully",
      user: findUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server error",
    });

  }
}
