const express = require('express');
const { getImageUploader,getImage,uploadImg,get } = require('../controllers/imageController');
const imagesRouter = express.Router();
const {uploadImage}=require('../multer');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

require('dotenv/config');
 

 
imagesRouter.use(bodyParser.urlencoded({ extended: false }))
imagesRouter.use(bodyParser.json())



imagesRouter.get('/:id', getImage);
// Step 8 - the POST handler for processing the uploaded file

//imagesRouter.post('/upload', upload.single('imagek'),uploadImage);

imagesRouter.post('/upload', uploadImage().array('productImage'), uploadImg);



module.exports = imagesRouter;