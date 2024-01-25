const db = require("../data/database");

class Product {
  constructor(bookData) {
    this.title = bookData.title;
    this.initial = bookData.initial;
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
    this.imageUri = `/books/assets/books/${this.image}`;
  }

  async save() {
    const bookData = {
      title: this.title,
      initial: this.initial,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    await db.getDb().collection("books").insertOne(bookData);
  }

  static async findAll() {
    const books = await db.getDb().collection("books").find().toArray();
    return books.map(function (bookDocument) {
      return new Product(bookDocument);
    });
  }
}

module.exports = Product;
