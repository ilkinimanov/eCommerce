const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 100,
    minLength: 20,
    required: true
  },
  description: {
    type: String,
    maxLength: 1000,
    minLength: 250,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true
  }
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
