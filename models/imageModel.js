// Step 3 - this is the code for ./models.js

//The important point here is that our data type for the image is a Buffer which allows us to store our image as data in the form of arrays.

const mongoose = require('mongoose');

// const imageSchema = new mongoose.Schema({
	
// 	img:
// 	{
// 		data: Buffer,
// 		contentType: String
// 	}
// });

const imageSchema = new mongoose.Schema({
	
	img:
	{
		url: String,
		//contentType: String
	}
});


// const imageSchema = mongoose.Schema({
//     imageName : {
//         type : String,
//         required : true
//     },
//     url : {
//         type: String,
//         required : true
//     }
// })


//Image is a model which has a schema imageSchema
const imageModel = mongoose.model('Image', imageSchema);
module.exports = imageModel;
//module.exports = new mongoose.model('Image', imageSchema);
