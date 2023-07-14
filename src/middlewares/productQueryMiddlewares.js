import Product from '../models/productModel.js'


export const productQueryFilter = async(req, res, next) => {
  let queryObj = { ...req.query };
  const queryKeys = ['title', 'price', 'isverified'];
  Object.keys(queryFields).forEach(el => {
    if (!queryFields.includes(el)) {
      throw new Error(`${el} is not a defined field`);
    }
  });

  queryObj = JSON.stringify(queryObj);
  queryObj = queryObj.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  queryObj = JSON.parse(queryObj);

  req.query = queryObj;

  next();
}

export const productQuerySort = async(req, res, next) => {
  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    delete req.query.sort
    req.sort = sortBy;
  } else {
    req.sort = 'createdAt';
  }

  next();
}

export const productQueryFields = async (req, res, next) => {
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    delete req.query.fields;
    req.fields = fields;
  } else {
    req.fields = '-__v';
  }

  next();
}

export const productQueryPaginate = async(req, res, next) => {
  const countProducts = await Product.countDocuments();
  req.page = req.query.page * 1 || 1;
  delete req.query.page;

  req.limit = req.query.limit * 1 || countProducts;
  delete req.query.limit;

  req.skip = (req.page - 1) * req.limit;

  next();
}
