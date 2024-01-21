const User = require("../model/user");
const sessionFlash = require("../utils/session-flash");
const validateUser = require("../utils/validation");
const authenticateUser = require("../utils/authenticateUser");

//get the login page.
function getLogin(req, res) {
  //get data stored in session for this user.
  let sessionData = sessionFlash.getSessionData(req);
  //check if there is data stored in session
  if (!sessionData) {
    sessionData = { email: "", password: "" };
  }
  res.render("shared/login", { sessionData: sessionData });
}

//get the signup page.
function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      fullname: "",
      city: "",
      phone: "",
    };
  }
  res.render("shared/signup", { sessionData: sessionData });
}

//sign up
async function signup(req, res, next) {
  const reqData = req.body;
  let userExists;
  const user = new User(
    reqData.email,
    reqData.password,
    reqData["full-name"],
    reqData.city,
    reqData["phone-number"]
  );

  if (
    !validateUser.userDetailsAreValid(
      reqData.email,
      reqData.password,
      reqData["full-name"],
      reqData.city,
      reqData["phone-number"]
    ) ||
    !validateUser.emailsAreTheSame(reqData.email, reqData["confirm-email"])
  ) {
    sessionFlash.flashSessionData(
      req,
      {
        message: "Check your input and try again.",
        email: reqData.email,
        confirmEmail: reqData["confirm-email"],
        password: reqData.password,
        fullname: reqData["full-name"],
        city: reqData.city,
        phone: reqData["phone-number"],
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }
  try {
    userExists = await user.userExists();
  } catch (error) {
    next(error);
    return;
  }

  if (userExists) {
    sessionFlash.flashSessionData(
      req,
      {
        message: "User already exists.",
        email: reqData.email,
        confirmEmail: reqData["confirm-email"],
        password: reqData.password,
        fullname: reqData["full-name"],
        city: reqData.city,
        phone: reqData["phone-number"],
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  try {
    await user.save();
    res.redirect("/login");
  } catch (error) {
    next(error);
    return;
  }
}

//login
async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let userExists;
  let passwordsMatch;

  //check if user exists
  try {
    userExists = await user.userExists();
  } catch (error) {
    next(error);
    return;
  }
  if (!userExists) {
    sessionFlash.flashSessionData(
      req,
      {
        message: "User does not exist.",
        email: req.body.email,
        password: req.body.password,
      },
      function () {
        res.redirect("/login");
      }
    );

    return;
  }

  //check if passwords is correct
  try {
    passwordsMatch = await user.passwordsMatch(userExists.password);
  } catch (error) {
    next(error);
    return;
  }

  if (!passwordsMatch) {
    sessionFlash.flashSessionData(
      req,
      {
        message: "Wrong password.",
        email: req.body.email,
        password: req.body.password,
      },
      function () {
        res.redirect("/login");
      }
    );

    return;
  }

  authenticateUser.createUserSession(req, userExists, function () {
    res.redirect("/");
  });
}

//logout
function logout(req, res) {
  authenticateUser.destroyUserSession(req);
  res.redirect("/");
}
module.exports = {
  getLogin: getLogin,
  getSignup: getSignup,
  signup: signup,
  login: login,
  logout: logout,
};
