function createUserSession(req, user, action) {
  //extract user id from the user passed as parameter in our function.
  req.session.uid = user._id.toString();
  //check if the user passed as a parameter in our function is an Admin.
  req.session.isAdmin = user.isAdmin;
  //save the created user session.
  req.session.save(action);
}

function destroyUserSession(req) {
  //destroy user session.
  req.session.uid = null;
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserSession: destroyUserSession,
};
