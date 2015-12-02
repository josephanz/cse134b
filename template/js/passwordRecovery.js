Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");
//Parse.initialize("3zsVEcWcoiBMqwA4kFftFSJk2kTIsCYY2Hc2dXJ0", "Gp6Mdb5ydKdPiiho32LOFzs5kcwMVqW3pVosxfJy");
function resetPassword() {
  var email = document.getElementById("email").value;

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
