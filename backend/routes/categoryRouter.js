const express = require('express');
const categoryController = require('../controllers/categoryCtrl');

const userController = require('../controllers/usersCtrl');
const isAuthenticated = require("../middlewares/isAuth");

const categoryRouter = express.Router();

//! add
categoryRouter.post('/create', isAuthenticated, categoryController.create);

//! lists
categoryRouter.get('/lists',
    isAuthenticated,
    categoryController.lists);

//! update
categoryRouter.put('/update/:id',
    isAuthenticated,
    categoryController.update);

//! delete
categoryRouter.delete('/delete/:id',
    isAuthenticated,
    categoryController.delete);


module.exports = categoryRouter;