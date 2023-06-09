const mongoose = require('mongoose');
const productValidators = require('../validators/productValidators');


const productSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 100,
    minLength: 3,
    required: true
  },
  description: {
    type: String,
    maxLength: 1000,
    minLength: 50,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: productValidators.imageExtensionValidator,
      message: "The image file isn't valid"
    }
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true
  }
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
