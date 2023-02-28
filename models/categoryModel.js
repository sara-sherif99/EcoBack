const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    categoryName:"string",
});

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;