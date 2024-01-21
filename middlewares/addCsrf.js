// Middleware function to add CSRF token to response locals
function addCsrf(req, res, next) {
    // Set the CSRF token in res.locals
    res.locals.csrfToken = req.csrfToken();
    // Continue to the next middleware or route handler
    next();
  }
  
  // Export the middleware function for use in other modules
  module.exports = addCsrf;