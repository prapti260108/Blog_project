const fs = require("fs");
const path = require("path");
const multer = require("multer");
const UserModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// For Image
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage: storageConfig });

// Signup
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) return res.send({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    username,
    email,
    password: hashedPassword,
    image: profileImage,
  });

  console.log("Signup successful", newUser);
  res.redirect("/user/login");
};

// Render Signup Page
const renderSignupPage = async (req, res) => res.render("signUP", { user: req.user });

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).send({ message: "User not found" });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return res.status(401).send({ message: "Incorrect password" });

  const token = jwt.sign({ id: user._id, email: user.email }, "private-key", { expiresIn: "4h" });

  // Send token as a cookie or in the response
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
  
  // Redirect to the blog creation page after successful login
  res.redirect("/blogs/create");  // Redirecting to blog creation page
};

// Render Login Page
const renderLoginPage = async (req, res) => res.render("login", { user: req.user });

// Logout
const logoutUser = (req, res) => {
  // Clear the token from cookies
  res.clearCookie('token');
  // Redirect to login page or homepage
  res.redirect('/user/login');
};

module.exports = {
  signUP: [upload.single("image"), registerUser],
  login: loginUser,
  signupFile: renderSignupPage,
  Loginfile: renderLoginPage,
  logoutUser: logoutUser,
};
