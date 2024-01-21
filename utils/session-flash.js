function getSessionData(req) {
  //get userdata that was saved in the session during login
  const sessionData = req.session.userInfo;

  req.session.userInfo = null;
  return sessionData;
}

function flashSessionData(req, data, action) {
  //store user entered data to session and save the session before redirecting.
  req.session.userInfo = data;
  req.session.save(action);
}

module.exports = {
  getSessionData: getSessionData,
  flashSessionData: flashSessionData,
};
