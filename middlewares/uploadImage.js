// Import required libraries
const multer = require("multer");
const uuid = require("uuid").v4;

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    // Specify the destination folder for storing uploaded images
    destination: "images/books",

    // Define the filename for the uploaded image using a combination of UUID and original filename
    filename: function (req, file, callback) {
      callback(null, uuid() + "-" + file.originalname);
    },
  }),
});

// Create a middleware for handling single image uploads using multer
const imageUploadMiddleware = upload.single("image");

// Export the middleware for use in other parts of the application
module.exports = imageUploadMiddleware;

