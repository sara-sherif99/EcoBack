const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminName: "string",
  email: "string",
  password: "string",
  phone: "string",
  address: "string",
  gender: "string",
});


const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
