//import express package and creating app by executing express as a function
const express = require("express");
const app = express();

//importing the path package to help me with file paths.
const path = require("path");

//import express session package and the configuration file from config.
const session = require("express-session");
const sessionConfiguration = require("./config/session");
const csrf = require("csurf");

//create environment variables for the port configuration
let port = 3000;
if (process.env.PORT) {
  port = process.env.PORT;
}

//importing the database functionality and the routes.
const db = require("./data/database");
const authRoutes = require("./routes/auth-routes");
const baseRoutes = require("./routes/base-routes");
const adminRoutes = require("./routes/admin-routes");

//import middlewares
const errorHandlerMiddlware = require("./middlewares/errorHandler");
const addCsrfTokenMiddleware = require("./middlewares/addCsrf");
const checkAuthStatusMiddleware = require("./middlewares/checkAuthentication");

//set view engine and the path to the views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware for sending post requests and serving static files, that is, styles and scripts
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//configure session
const sessionConfig = sessionConfiguration();
app.use(session(sessionConfig));

//using the csurf package to protect against csrf attacks
//app.use(csrf());

//app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

//add routes as middlewares.
app.use(authRoutes);
app.use(baseRoutes);
app.use("/admin", adminRoutes);

//add error handling middleware
app.use(errorHandlerMiddlware);
//ensure that there is a database connection before listening to port 3000 and starting our server
db.connectToDatabase().then(function () {
  app.listen(port);
});
