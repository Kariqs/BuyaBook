// Function to check if a given value is empty or consists only of whitespace
function isEmpty(value) {
    return !value || value.trim() === "";
  }
  
  // Function to check if the provided email is valid and if the password is at least 6 characters long
  function userInputIsValid(email, password) {
    // Returns true if email is not empty, contains '@', and password is at least 6 characters long; otherwise, returns false
    return email && email.includes("@") && password && password.trim().length > 5;
  }
  
  // Function to check if user details (email, password, fullname, city, phone) are valid and not empty
  function userDetailsAreValid(email, password, fullname, city, phone) {
    // Calls userInputIsValid to check email and password
    // Also checks that fullname, city, and phone are not empty
    // Returns true if all conditions are met; otherwise, returns false
    return (
      userInputIsValid(email, password) &&
      !isEmpty(fullname) &&
      !isEmpty(city) &&
      !isEmpty(phone)
    );
  }
  
  // Function to check if the provided email and confirmEmail are the same
  function emailsAreTheSame(email, confirmEmail) {
    // Returns true if the emails match; otherwise, returns false
    return email === confirmEmail;
  }
  
  // Exporting the userDetailsAreValid and emailsAreTheSame functions for use in other modules
  module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailsAreTheSame: emailsAreTheSame,
  };
  