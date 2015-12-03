Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");
//Parse.initialize("3zsVEcWcoiBMqwA4kFftFSJk2kTIsCYY2Hc2dXJ0", "Gp6Mdb5ydKdPiiho32LOFzs5kcwMVqW3pVosxfJy");


var errorText = document.getElementById("errorMessage");

var fields = {
  // counts how many times a user visited the page
  // visited: "visited"
};
Parse.Analytics.track('PwRecoveryPage', fields);
  
console.log(successText);
function resetPassword() {
  var email = document.getElementById("email").value;

  var valid = {
    pwRequestSuccess: String(email)
  };

  var userEmail = {
    pwRequestError: String(email)
  };
  

  Parse.User.requestPasswordReset(email, {
    success: function() {
      alert("Password recovery email was sent to: " + email);
      Parse.Analytics.track('PwRecoveryPage', valid);
      document.location.href = "login.html";
    },
    error: function(error) {
      if(error.code === 205){
        alert("Password recovery email was sent to: " + email);
        Parse.Analytics.track('PwRecoveryPage', userEmail);
        document.location.href = "login.html";
      }
      else{
        // Show the error message somewhere
        Parse.Analytics.track('PwRecoveryPage', userEmail);
        errorText.innerHTML = "Error: " + error.message;
        errorText.style.display = "block";
        //alert("Error: " + error.code + " " + error.message);
      }
    }
  });
}


