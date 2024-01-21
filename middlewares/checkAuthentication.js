// Middleware function to check user authentication status
function checkAuth(req, res, next) {
  // Retrieve the user ID from the session
  const uid = req.session.uid;

  // If the user ID is not present, proceed to the next middleware or route handler
  if (!uid) {
    return next();
  }

  // If the user is authenticated, set authentication-related locals
  res.locals.uid = uid; // Set the user ID in res.locals
  res.locals.isAuth = true; // Indicate that the user is authenticated
  res.locals.isAdmin = req.session.isAdmin; // Set isAdmin based on the session data

  // Continue to the next middleware or route handler
  next();
}

// Export the checkAuth middleware function for use in other modules
module.exports = checkAuth;
