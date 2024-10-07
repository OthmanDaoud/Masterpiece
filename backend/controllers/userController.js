const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/User");
require("dotenv").config();

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP. Please try again.");
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { email, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your email password
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reply to your message",
      text: message,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending Message:", error);
  }
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password during Signup:", hashedPassword); // Log for verification

    const otp = generateOTP(); // Assuming you have a generateOTP function
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      otp,
      otpExpiry,
    });

    await newUser.save();
    console.log("User saved successfully:", newUser);

    await sendOTP(email, otp); // Assuming you have a sendOTP function
    console.log("OTP sent to:", email);

    res
      .status(201)
      .json({ message: "User registered. Check your email for OTP." });
  } catch (error) {
    console.error("Error in signUp controller:", error);
    res.status(500).json({ error: "Server error." });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpiry = undefined;

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    await user.save();

    // Send response
    res.status(200).json({
      success: true,
      message: "OTP verified successfully. You are now logged in.",
      token, // Include token in response for frontend storage
    });
  } catch (error) {
    console.error("Error in verifyOTP controller:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    // Normalize the email and trim it
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // console.log("hashedPassword ", hashedPassword);
    // console.log("user.password ", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error in logIn controller:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Profile

exports.getProfile = async (req, res) => {
  try {
    // Assuming you have user authentication middleware
    const userId = req.user;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { name, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    if (password) {
      // Hash the password before saving
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
