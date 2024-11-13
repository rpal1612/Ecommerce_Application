const Category = require("../models/category.model");
const Product = require("../models/product_model");

//create new product and save it;
exports.createNewProducts = async (req, res) => {
  //create a new product
  console.log("You can create new products here..");
  const data = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    cost: req.body.cost,
  };

  //insert
  try {
    const product = await Product.create(data);
    console.log(`New product '${product.name}' created `);

    // Find or create the category
    let category = await Category.findOne({ name: product.category });
    if (!category) {
      category = await Category.create({ name: product.category, products: [product._id] });
    } else {
      category.products = [...(category.products || []), product._id];
      await category.save();
    }

    res.status(201).send(product);
  } catch (err) {
    console.log("Error while creating a new product!", err);
    return res.status(500).send({
      message: "Error while creating a new product",
    });
  }
};

//fetch products
exports.getAllProducts = async (req, res) => {
  try {
    const queryObj = {};

    if (req.query.category) {
      queryObj.category = req.query.category;
    }

    const products = await Product.find(queryObj).populate("category");

    res.status(200).send(products);
  } catch (err) {
    console.log("#### Error while getting all products ####", err.message);
    res.status(500).send({
      message: "Internal server error while getting all products",
    });
  }
};