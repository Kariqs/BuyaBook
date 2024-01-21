// Error handling middleware function
function errorHandler(error, req, res, next) {
  // Log the error to the console
  console.log(error);

  // Set the HTTP status code to 500 (Internal Server Error)
  res.status(500);

  // Render the "shared/500" template
  res.render("shared/500");
}

// Export the error handling middleware function for use in other modules
module.exports = errorHandler;
