const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");

//creating the session storage functionality.
function createSession() {
  const MongoDBStore = mongodbStore(session);
  const sessionStorage = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "buyabook",
    collection: "sessions",
  });

  return sessionStorage;
}

//configuring the expess-session package.
function sessionConfiguration() {
  return {
    secret: "keyboard-act",
    resave: false,
    saveUninitialized: false,
    store: createSession(),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  };
}

module.exports = sessionConfiguration;
