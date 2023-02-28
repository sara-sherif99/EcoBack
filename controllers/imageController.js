// Step 7 - the GET request handler that provides the HTML UI
const imageModel =require("../models/imageModel");
const upload =require("../multer");
var fs = require('fs');
var path = require('path');



const getImageUploader = async (req, res) => {
	const uploadPage = imageModel.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.render('imagesPage', { items: items });	
		}
	});
};

// ImageController.findById(req.params.id, function (err, img) {
//     if(err) { return handleError(res, err); }
//     if(!foto) { return res.send(404); }
//     return res.json(img.toString('base64'));
//   });

//GET one image
const getImage = function(req, res, next){
	const {id} = req.params;
    imageModel.findById(id , function (err, media){
        if (err) return next (err);
        res.json(media);
        console.log(media)
       // res.json(media);
       
       
    });
};

const get = async (req,res)=>{
	const {id} = req.params;
    const image = await imageModel.findById(id)
    res.json(image)
}

// ImageController.create({image: new Buffer(req.body.image, "base64")}, 
//   function(err, img) {
//       if(err) { return handleError(res, err); }
//       return res.status(201).json(img);
//   }
// );

// Step 8 - the POST handler for processing the uploaded file
 
const uploadImg = (req, res, next) => {
    console.log(req.files[0].originalname);
        var obj = {
            img: {
                url: `${req.protocol}://${req.hostname}:3000/${req.files[0].originalname}`,
            }
        }
        imageModel.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                // item.save();
                res.redirect('/image');
            }
        });
    };


module.exports={
   getImageUploader,
	getImage,
	uploadImg,
	get
}