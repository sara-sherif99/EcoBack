const express = require('express');
const productsRouter = express.Router();
const productValidation = require('../validation/productValidation');
const {uploadImage}=require('../multer');
const {getAllProducts, getByPrice, addProduct, editProduct, deleteProduct, getProductById,editProductImage } = require('../controllers/productController');



productsRouter.get('/' ,getAllProducts);
productsRouter.get('/:id' ,getProductById);
productsRouter.get('/price' ,getByPrice )
//productsRouter.post("",productValidation,uploadImage().array('productImage'),addProduct);
productsRouter.post("",uploadImage().array('productImage'),addProduct);
productsRouter.patch("/:id",editProduct)
productsRouter.patch("/image/:id", uploadImage().single('productImage'),editProductImage)
productsRouter.delete("/:id",deleteProduct )
module.exports=productsRouter;