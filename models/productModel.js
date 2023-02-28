const mongoose = require('mongoose');

var URL = `http://localhost:3000/defaultProduct.png`;
const productSchema = new mongoose.Schema({
  name: 'string',
  price:'number',
  sale:'number',
  quantity:'number',
  description: 'string',
  category:'string',
  inStock:'string',
  imgURL: {
    type: 'string',
    default : URL,
  }
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;