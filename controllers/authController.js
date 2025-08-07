const bcrypt = require("bcrypt");
const User = require("../models/User");

// Show signup form
exports.showSignup = (req, res) => {
  res.render("signup");
};

// Show login form
exports.showLogin = (req, res) => {
  res.render("login");
};

// Register new user
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({ name, email, password: hashedPassword, role });
    res.redirect("/login");
  } catch (err) {
    console.log("Signup Error:", err);
    res.send("Signup Failed");
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Invalid password");

  req.session.user = {
    _id: user._id,
    name: user.name,
    role: user.role
  };

  res.redirect("/");
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};