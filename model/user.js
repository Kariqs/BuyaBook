const db = require("../data/database");
const bcrypt = require("bcrypt");

class User {
  constructor(email, password, fullname, city, phone) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.city = city;
    this.phone = phone;
  }

  async save() {
    const userInfo = {
      email: this.email,
      password: await bcrypt.hash(this.password, 12),
      fullname: this.fullname,
      city: this.city,
      phone: this.phone,
    };
    db.getDb().collection("users").insertOne(userInfo);
  }

  async userExists() {
    const email = this.email;
    const result = await db
      .getDb()
      .collection("users")
      .findOne({ email: email });
    return result;
  }

  async passwordsMatch(encryptedPassword) {
    return await bcrypt.compare(this.password, encryptedPassword);
  }
}

module.exports = User;
