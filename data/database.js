const { MongoClient } = require("mongodb");

//create environment viriables for the uri.
let mongodbUrl = "mongodb://127.0.0.1:27017";
if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}

let database;

//connect to the mongodb server
async function connectToDatabase() {
  try {
    const client = await new MongoClient(mongodbUrl).connect();
    database = client.db("buyabook");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//get the database from the server
function getDb() {
  if (!database) {
    console.log("Database was not found!");
    throw new Error("Connecting to database failed!");
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
