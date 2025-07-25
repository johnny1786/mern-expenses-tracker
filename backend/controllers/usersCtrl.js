const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//!User Registration

const userController = {

  //! Register a new user
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    //!validate
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill all fields");
    }

    //!Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    //!Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //!Create a new user and save to DB
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword
    });
    console.log(userCreated);

    res.json({
      _id: userCreated._id,
      email: userCreated.email,
      username: userCreated.username
    });
  }), 

  //!Login
  login: asyncHandler(async (req, res) => {
    //!Get user credentials
    const { email, password } = req.body;

    //!Validate
    if (!email || !password) {
      res.status(400);
      throw new Error("Please fill all fields");
    }

    //!Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Invalid login credentials");
    }

    //!Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    //!Generate a JWT token
    const token = jwt.sign({ id: user._id }, "masynctechKey", {
      expiresIn: "30d"
    });

    res.json({
      message: "Login successful",
      token,
      id: user._id,
      email: user.email,
      username: user.username
    });
  }),

  //!profile
  profile: asyncHandler(async (req, res) => {
    //!Find the user
    const user = await User.findById("687f4864305a373c37964142");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json({
      email: user.email,
      username: user.username
    });
  }),


  //!change password
  changeUserpassword: asyncHandler(async (req, res) => {
    const {  newPassword } = req.body;

     //!Find the user
    const user = await User.findById(req.user);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    //!Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    //!Save the updated user
    await user.save();

    res.json({
      message: "Password changed successfully"
    });
  }),

  //!update user profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { username, email } = req.body;

    //!Find the user
    const updatedUser = await User.findByIdAndUpdate(req.user, {
      username,
      email
    }, { new: true });

    res.json({
      message: "Profile updated successfully",
      updatedUser
    });
  })

};

module.exports = userController;