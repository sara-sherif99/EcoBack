// Step 5 - set up multer for storing uploaded files


var imageModel = require('./models/imageModel');

// var storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'uploads')
// 	},
// 	filename: (req, file, cb) => {
// 		// cb(null, file.fieldname + '-' + Date.now())
// 		cb(null, file.originalname)
// 	}
// });

//  var upload = multer({ storage: storage });

// module.exports = {upload};
var multer = require('multer');
module.exports.uploadImage = () => {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads')
		},
		filename: (req, file, cb) => {
			// cb(null, file.fieldname + '-' + Date.now())
			cb(null, file.originalname)
		}
	});

	const imageFileFilter = (req,file,cb) => {
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
			return cb (new Error ('You can upload only image files!'),false);
		}
		cb(null,true);
	};
	return multer({storage});
}

