const express = require("express");
const adminValidation = require("../validation/adminValidation");

const adminRouter = express.Router();
//const path= require ('path');
// const fsPromise =require('fs/promises');
// const fs =require('fs');

const {
  login,
  signup,
  getAllUsers,
  getUserById,
  deleteUser,
  editUser,
} = require("../controllers/adminController");

// usersRouter.get('/' ,getAllUsers);
// usersRouter.get('/:id' ,getUserById);
// usersRouter.delete('/:id' ,deleteUser);
adminRouter.post("/login", login);
adminRouter.post("/signup", adminValidation, signup);
// usersRouter.patch("/:id",editUser );
module.exports = adminRouter;
