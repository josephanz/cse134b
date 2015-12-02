Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");



  var fields = {
  // Define ranges to bucket data points into meaningful segments
     visited: "visited"
  };
  Parse.Analytics.track('PwRecoveryPage', fields);
  
function resetPassword() {
  var email = document.getElementById("email").value;

  var userEmail = {
      error: String(email)
  };

  

  Parse.User.requestPasswordReset(email, {
    success: function() {
      alert("Password recovery email was sent to: " + email);
      document.location.href = "login.html";
    },
    error: function(error) {
      // Show the error message somewhere
      Parse.Analytics.track('PwRecoveryPage', userEmail);
      alert("Error: " + error.code + " " + error.message);
    }
  });
}


