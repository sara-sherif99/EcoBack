
const mongoose = require('mongoose'); 
 
const orderSchema = new mongoose.Schema({ 
  productIds: 'array', 
  userId:'string', 
  orderStatus:'string', 
  orderDate:'date', 
  totalPrice:'number' 
}); 
 
const orderModel = mongoose.model('Order', orderSchema); 
 
module.exports = orderModel;