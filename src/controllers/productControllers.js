import Product from '../models/productModel.js';

export const getProducts = async(req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json(products);
  }
  catch(err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

export const createProduct = async(req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res
      .status(201)
      .json(newProduct);
  }
  catch(err) {
    res
      .status(400)
      .json({ message: err.message });
  }
};

export const getProductById = async(req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error('Product not found');
    }
    res
      .status(200)
      .json(product);
  }
  catch (err) {
    res
      .status(404)
      .json({ message: err.message });
  }
};

export const updateProductById = async(req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: false,
        runValidators: true
      });
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    res
      .status(200)
      .json(updatedProduct);
  }
  catch (err) {
    res
      .status(404)
      .json({ message: err.message });
  }
};

export const deleteProduct = async(req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new Error('Product not found');
    }
    res
      .status(204)
      .json({ status: "successful" })
  }
  catch (err) {
    res
      .status(404)
      .json({ message: 'Product not found' });
  }
};
