function getAllProducts(req, res) {
  res.render("shared/all-products");
}

module.exports = { getAllProducts: getAllProducts };
