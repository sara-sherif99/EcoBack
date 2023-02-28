const express = require('express');
const userValidation = require('../validation/userValidation');
const {uploadImage}=require('../multer');


const usersRouter = express.Router();
const {login, signup,getAllUsers,
    getUserById,
    deleteUser,editUser,editUserImage,addToWishList, removeFromWishList,addToCart, removeFromCart} = require('../controllers/userController');



usersRouter.get('/' ,getAllUsers);
usersRouter.get('/:id' ,getUserById);
usersRouter.delete('/:id' ,deleteUser);
usersRouter.post("/login",login );
usersRouter.post("/signup",userValidation,signup );
usersRouter.patch("/:id",editUser);
usersRouter.patch("/image/:id", uploadImage().single('userImage'),editUserImage);
usersRouter.patch("/wishlist/:id",addToWishList);
usersRouter.delete("/wishlist/:uid/:pid",removeFromWishList);
usersRouter.patch("/cart/:id",addToCart);
usersRouter.delete("/cart/:uid/:pid",removeFromCart);
module.exports=usersRouter;
