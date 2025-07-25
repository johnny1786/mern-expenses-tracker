const express = require('express');
const categoryController = require('../controllers/categoryCtrl');

const userController = require('../controllers/usersCtrl');
const isAuthenticated = require("../middlewares/isAuth");

const categoryRouter = express.Router();

//! add
categoryRouter.post('/api/v1/categories/create', isAuthenticated, categoryController.create);

//! lists
categoryRouter.get('/api/v1/categories/lists',
    isAuthenticated,
    categoryController.lists);

//! update
categoryRouter.put('/api/v1/categories/update/:id',
    isAuthenticated,
    categoryController.update);

//! delete
categoryRouter.delete('/api/v1/categories/delete/:id',
    isAuthenticated,
    categoryController.delete);


module.exports = categoryRouter;