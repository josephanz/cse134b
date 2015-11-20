function resetPassword() {
  var email = document.getElementById("email");
  Parse.User.requestPasswordReset(email, {
    success: function() {
      alert("Password recovery email was sent to: " + email);
      document.location.href = "login.html";
    },
    error: function(error) {
      // Show the error message somewhere
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
