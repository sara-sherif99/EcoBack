const express = require('express');
const categoryValidation = require('../validation/categoryValidation');
const { getCategories,getCategoryById,addCategory, editCategory,deleteCategory } = require('../controllers/categoryController');
const categoriesRouter = express.Router();


categoriesRouter.get('/' ,getCategories);
categoriesRouter.get('/:id' ,getCategoryById);
categoriesRouter.post("",categoryValidation,addCategory);
categoriesRouter.patch("/:id",editCategory);
categoriesRouter.delete("/:id",deleteCategory)

module.exports = categoriesRouter;