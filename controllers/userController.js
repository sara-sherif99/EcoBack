const userModel =require("../models/userModel");
const userValidation = require('../validation/userValidation');
const { hashPassword, comparePassword, userToken,authorizeUser } = require('../userHelper');
const { custom } = require('joi');
const customError = require('../customError');




function Access (res){
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
}

login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    await comparePassword(password, user.password);
    if (user) {
      var id = user.id;
      const token = await userToken(id);
      res.status(200).send({ message: 'Logged in', token, user });
    }
    else {
      res.status(401).send({ message: 'Invalid user or password' });
    }
  } catch (error) {
    res.status(401).send({ message: 'Invalid user or password' });
    //next(error);
  }

};

signup = async (req, res, next) => {
  try {
    const { userName, email, password, gender } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      res.status(401).send({ message: 'This email is already used' });
    }
    else {
      const hashedPassword = await hashPassword(password);
      var user = await userModel.create({ userName, email, password: hashedPassword, gender });
      var id = user.id;
      const token = await userToken(id);
      res.status(200).send({ message: 'Signed up', token, user });
    }

  }
  catch (error) {
    res.status(401).send({ message: 'Can not sign up' });
    //next(error);
  }

};

const getAllUsers = async (req, res) => {
  const users = await userModel.find({})
  Access(res);
  res.status(200).send(users);
  }

  const getUserById = async(req, res) => {
    const {id} = req.params;
    //console.log("hi"+id);
    const userById =await userModel.findById(id)
    console.log(userById );
    Access(res);
    res.status(200).send(userById);
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  userModel.findByIdAndDelete( id , function (err) {
      if (err) return handleError(err);
    });
    Access(res);
  res.status(200).send();
}

const editUser = async(req, res, next) => {
  const { id } = req.params;
    const { userName,email, password ,address,phone } = req.body;
    const { authorization: token } = req.headers;
    try {
        await authorizeUser(id, token);
        try {
          var user={};
          if(password){
            const hashedPassword = await hashPassword(password);
            await userModel.findByIdAndUpdate(id, { userName,email, password:hashedPassword,address,phone});
            user=await userModel.findById(id);
          }
          else{
              await userModel.findByIdAndUpdate(id, {userName,email,address,phone});
              user= await userModel.findById(id);
          }
          Access(res);
          res.status(200).send({message: 'user updated successfully',user});

        } catch (error) {
            next(error);
        }

    } catch (error) {
        next(error);
    }
}

const editUserImage = async (req, res, next) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  imageupdate = `${req.protocol}://${req.hostname}:3000/${req.file.filename}`;
  try {
  await authorizeUser(id, token);
    try {
      await userModel.findByIdAndUpdate(id, { imgURL: imageupdate },{new:true});
      user= await userModel.findById(id);
      Access(res);
      res.status(200).send({ message: "user image updated",user });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
}

const addToWishList = async (req, res, next) => { 
  const { id } = req.params; 
  const { productId } = req.body; 
  try { 
    const user = await userModel.findByIdAndUpdate(id, { $addToSet: { wishlist: productId } }, { new: true }); 
    Access(res); 
    res.status(200).send({ message: 'Added to wish list', user }); 
 
  } catch (error) { 
    next(error); 
  } 
}

const removeFromWishList = async (req, res, next) => { 
  const { uid ,pid }  = req.params; 
   try{ 
    const user=await userModel.findByIdAndUpdate(uid, {$pull :{wishlist :pid}},{ new: true }); 
     
     res.status(200).send({ message: "wishList updated",user }); 
   } 
   catch (error) { 
     next(error);} 
}

const addToCart = async (req, res, next) => { 
  const { id } = req.params; 
  const { productId , amount} = req.body; 
  try { 
    const user = await userModel.findByIdAndUpdate(id, { $addToSet: { cart: {productId,amount} } }, { new: true }); 
    Access(res); 
    res.status(200).send({ message: 'Added to Cart', user }); 
 
  } catch (error) { 
    next(error); 
  } 
} 
 
const removeFromCart = async (req, res, next) => { 
  var user; 
  const { uid ,pid }  = req.params; 
   try{ 
    if(pid=="all"){ 
      user=await userModel.findByIdAndUpdate(uid,{ $set:{cart :[]}},{ new: true }); 
    } 
    else{ 
     user=await userModel.findByIdAndUpdate(uid, {$pull :{cart :{productId:pid}}},{ new: true }); 
    }; 
     res.status(200).send({ message: "wishList updated",user }); 
   } 
   catch (error) { 
     next(error);} 
}
  
module.exports={
   login,
   signup,
   getAllUsers,
   getUserById,
   deleteUser,
   editUser,
   editUserImage,
   addToWishList,
   removeFromWishList,
   addToCart,
   removeFromCart
}
