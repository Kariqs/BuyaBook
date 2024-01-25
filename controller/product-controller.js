const Product = require("../model/product");

async function getAllProducts(req, res) {
  const books = await Product.findAll();
  console.log(books)
  res.render("shared/all-products", { books: books });
}

module.exports = { getAllProducts: getAllProducts };
