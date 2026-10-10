
const User = require("../model/User");
const Order = require("../model/Order");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid user data"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const message = `
Welcome to HungerShop, ${name}! Thank you for registering.
Your account has been created successfully.

Your OTP for HungerShop registration is: ${otp}
`;

    await sendEmail(
      email,
      "Welcome to HungerShop - Your OTP for registration",
      message
    );

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    }

    return res.status(400).json({
      message: "Invalid email or password"
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

// Get all users without exposing passwords
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    return res.json(users);
  } catch (error) {
    console.error("Get users error:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

// Delete a user safely
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Protect every admin account
    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin accounts cannot be deleted"
      });
    }

    // Preserve users who have existing orders
    const existingOrders = await Order.exists({
      user: user._id
    });

    if (existingOrders) {
      return res.status(409).json({
        message: "This user has existing orders and cannot be deleted."
      });
    }

    await User.findByIdAndDelete(user._id);

    return res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  deleteUser
};