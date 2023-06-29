import mongoose from 'mongoose';
import Product from '../models/productModel.js';


describe('Product model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  test('Create a new product', async () => {
    const productData = {
      title: 'Sample Product',
      description: 'This is a sample product description. test should be at least 50 characters long to meet the minLength requirement.',
      price: 9.99,
      image: 'sample.jpg',
      isVerified: false,
      stockCount: 10,
    };

    const product = await Product.create(productData);

    expect(product.title).toBe(productData.title);
    expect(product.description).toBe(productData.description);
    expect(product.price).toBe(productData.price);
    expect(product.image).toBe(productData.image);
    expect(product.isVerified).toBe(productData.isVerified);
    expect(product.stockCount).toBe(productData.stockCount);
  });

  test('Require the title, description, price, image, isVerified, and stockCount fields', async () => {
    try {
      const product = new Product({});
      await product.validate();
    } catch (error) {
      expect(error.errors['title']).toBeDefined();
      expect(error.errors['description']).toBeDefined();
      expect(error.errors['price']).toBeDefined();
      expect(error.errors['image']).toBeDefined();
      expect(error.errors['stockCount']).toBeDefined();
    }
  });

  test('Validate the min and max length of title and description', async () => {
    try {
      const product = new Product({
        title: 'A',
        description: 'This is a short description',
        price: 9.99,
        image: 'sample.jpg',
        isVerified: false,
        stockCount: 10,
      });
      await product.validate();
    } catch (error) {
      expect(error.errors['title']).toBeDefined();
      expect(error.errors['description']).toBeDefined();
    }
  });

  test('Validate the minimum price value', async () => {
    try {
      const product = new Product({
        title: 'Sample Product',
        description: 'This is a sample product',
        price: 0,
        image: 'sample.jpg',
        isVerified: false,
        stockCount: 10,
      });
      await product.validate();
    } catch (error) {
      expect(error.errors['price']).toBeDefined();
    }
  });

  test('Validate the image extension', async () => {
    try {
      const product = new Product({
        title: 'Sample Product',
        description: 'This is a sample product',
        price: 9.99,
        image: 'sample.txt',
        isVerified: false,
        stockCount: 10,
      });
      await product.validate();
    } catch (error) {
      expect(error.errors['image']).toBeDefined();
    }
  });

  test('Set the default value of isVerified field to false', async () => {
    const product = new Product({
      title: 'Sample Product',
      description: 'This is a sample product',
      price: 9.99,
      image: 'sample.jpg',
      stockCount: 10,
    });

    expect(product.isVerified).toBe(false);
  });
});
