const productModel =require("../models/productModel");

function Access (res){
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
}

const getAllProducts = async (req, res) => {
const products = await productModel.find({})
Access(res);
res.status(200).send(products);
}


const getProductById = async(req, res) => {
    const {id} = req.params;
    //console.log("hi"+id);
    const productById =await productModel.findById(id)
    console.log(productById );
    Access(res);
    res.status(200).send(productById);
}





//price filtering
const getByPrice = async(req, res) => {
    const {minPrice,maxPrice} = req.body;
    const priceProducts =await productModel.find().where('price').gte(minPrice).lte(maxPrice)
    res.status(200).send(priceProducts);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Admin Methods
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const addProduct = async (req, res, next) => {
   console.log(req.files);
   console.log(req.body);
  // console.log(req.file);
   const {name,price,sale,quantity,description,category} = req.body;
   if(req.files) image = req.files[0].filename ;
    var newProduct = await productModel.create({ name,price,sale,quantity,description,category,inStock:'Yes',
    imgURL:  `${req.protocol}://${req.hostname}:3000/${image}`});
    Access(res); 
    res.status(200).send(newProduct);
    console.log(newProduct);
};
const editProduct =async (req, res, next) => {
    try{
    const  {id}= req.params;
    const {name,price,sale,quantity,description,category,inStock} = req.body;
     await productModel.findByIdAndUpdate(id, {name,price,sale,quantity,description,category,inStock});
    Access(res);
    res.status(204).send({message:"product updated"});
    }catch(error){
        next(error);
    }
}
const editProductImage=async (req, res, next) => {
    try{
    const  {id}= req.params;
    console.log(req.file.filename);
    imageupdate = `${req.protocol}://${req.hostname}:3000/${req.file.filename}`;
     await productModel.findByIdAndUpdate(id,{imgURL:imageupdate});
    Access(res);
    res.status(204).send({message:"product updated"});
    }catch(error){
        next(error);
   }
}



const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    productModel.findByIdAndDelete( id , function (err) {
        if (err) return handleError(err);
      });
      Access(res);
    res.status(204).send();
}

module.exports={
    getAllProducts,
    getProductById,
    getByPrice,
    addProduct,
    editProduct,
    editProductImage,
    deleteProduct,
}
