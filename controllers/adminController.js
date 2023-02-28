const adminModel = require("../models/adminModel");
const adminValidation = require("../validation/adminValidation");
const {
  hashPassword,
  comparePassword,
  authorizeUser,
  userToken,
} = require("../userHelper");
const { custom } = require("joi");
const customError = require("../customError");


function Access(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
}

login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    console.log(admin);
    await comparePassword(password, admin.password);

    if (admin) {
      var id = admin.id;
      const token = await userToken(id);
      res.status(200).send({ message: "Logged in", token, admin });
    } else {
      res.status(401).send({ message: "Invalid user or password" });
    }
  } catch (error) {
    res.status(401).send({ message: "Invalid user or password" });
  }
};



signup = async (req, res, next) => {
  try {
    const { adminName, email, password, gender } = req.body;
    const adminExist = await adminModel.findOne({ email });
    if (adminExist) {
      res.status(401).send({ message: "This email is already used" });
    } else {
      const hashedPassword = await hashPassword(password);
      var admin = await adminModel.create({
        adminName,
        email,
        password: hashedPassword,
        gender,
      });
      var id = admin.id;
      const token = await userToken(id);
      res.status(200).send({ message: "Signed up", token, admin });
    }
  } catch (error) {
    res.status(401).send({ message: "Can not sign up" });
    //next(error);
  }
};



module.exports = {
  login,
  signup,
};
