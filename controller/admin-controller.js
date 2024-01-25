const Product = require("../model/product");

function getNewBook(req, res) {
  res.render("admin/products/add-newbook");
}

async function addNewBook(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/");
}

module.exports = {
  getNewBook: getNewBook,
  addNewBook: addNewBook,
};
