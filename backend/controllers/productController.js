const { param } = require("../app");
const Product = require("../models/productModel");

//create product -- Admin
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// Get All Product
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    message: "Success",
    products,
  });
};

//Update Product --Admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Product updated successfully
    return res.status(200).json({
      success: true,
      message: "Product updated",
      product,
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      // Invalid product ID
      return res.status(404).json({ error: "Product not found" });
    }

    // Other error occurred
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    // const product = await Product.findById(req.params.id );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.deleteOne(req.param.id);

    return res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      // Invalid product ID
      return res.status(404).json({ error: "Product not found" });
    }

    // Other error occurred
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
