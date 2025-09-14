const express = require('express');

const userController = require('../controllers/usersCtrl');
const isAuthenticated = require("../middlewares/isAuth");

const userRouter = express.Router();

//! Register
userRouter.post('/register', userController.register);

//! Login
userRouter.post('/login', userController.login);

//! Profile
userRouter.get('/profile',
   isAuthenticated,
    userController.profile);

//! change password
userRouter.put('/change-password',
   isAuthenticated,
   userController.changeUserpassword);

//! Update profile

userRouter.put('/update-profile',
   isAuthenticated,
   userController.updateUserProfile);

module.exports = userRouter;