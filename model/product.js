const db = require("../data/database");

class Product {
  constructor(bookData) {
    this.title = bookData.title;
    this.initialPrice = bookData["initial-price"];
    this.price = bookData.price;
    this.description = bookData.description;
    this.image = bookData.image;
    this.updateImageData();
    if (bookData._id) {
      this.id = bookData._id.toString();
    }
  }

  updateImageData() {
    this.imagePath = `images/books/${this.image}`;
    this.imageUri = `/books/assets/images/${this.image}`;
  }

  async save() {
    const bookData = {
      title: this.title,
      initialPrice: this.initialPrice,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    await db.getDb().collection("books").insertOne(bookData);
  }
}

module.exports = Product;
