const bcrypt = require("bcrypt");
const User = require("../models/User");

// Show signup form
exports.showSignup = (req, res) => {
  res.render("signup", { error: null });
};

// Show login form
exports.showLogin = (req, res) => {
  res.render("login", { error: null });
};

// Register new user
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    

  res.redirect("/login");



  } catch (err) {
    console.error("Signup Error:", err);
    res.render("signup", { error: "Something went wrong. Please try again." });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid password" });
    }

    req.session.user = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

 res.redirect("/");

  } catch (err) {
    console.error("Login Error:", err);
    res.render("login", { error: "Something went wrong. Please try again." });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
