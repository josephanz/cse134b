
Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");
//some useful globals
var errorText = document.getElementById("errorMessage");
var signUpText = document.getElementById("signInMessage");

function validateLogin() {
    var usermail = document.getElementById("usermail").value;
    var password = document.getElementById("password").value;

    if( usermail == null || usermail == ""){
        errorText.innerHTML = "Error: Email field is empty";
        errorText.style.display = "block";
        return false;
    }
    if( password == null || password == ""){
        errorText.innerHTML = "Error: Password field is empty";
        errorText.style.display = "block";
        return false;
    }
    return true;
}

function validateSignup() {
    var usermail = document.getElementById("usermail").value;
    var password = document.getElementById("password").value;

    if( usermail == null || usermail == ""){
        errorText.innerHTML = "Error: Email field is empty";
        errorText.style.display = "block";
        return false;
    }
    if( password == null || password == ""){
        errorText.innerHTML = "Error: Password field is empty";
        errorText.style.display = "block";
        return false;
    }
    return true;

}
function onClickLogin() {
    errorText.style.display = "none";
    signUpText.style.display = "none";
    var usermail = document.getElementById("usermail").value;
    var password = document.getElementById("password").value;

    if( validateLogin() === true ){
      login(usermail, password);
  }

}


function onClickSignUp() {
    errorText.style.display = "none";
    signUpText.style.display = "none";
    var usermail = document.getElementById("usermail").value;
    var password = document.getElementById("password").value;
    if( validateSignup() === true ){
        signUp(usermail, password);
    }
    else{return false;}

}

function signUp(email, password) {
  var user = new Parse.User();
  user.set("username", email);
  user.set("password", password);
  user.set("email", email);

  user.setACL(new Parse.ACL());
  user.signUp(null, {
    success: function(user) {
      signUpText.style.display = "block";
      //alert("Hooray! Let them use the app now.");
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      //alert("Error: " + error.code + " " + error.message);
      console.log(error.code);
      errorText.innerHTML = "Error: " + error.message;

      errorText.style.display = "block";
    }
  });
}

function login(username, password) {
  Parse.User.logIn(username, password, {
    success: function(user) {
      //alert("Hooray! Let them use the app now.");
      window.location = ("../src/welcome.html");

    },
    error: function(user, error) {
        console.log(error.code);
        errorText.innerHTML = "Error: " + error.message;
        errorText.style.display = "block";
        document.getElementById("signInMessage").value = 'Email or Password is incorrect';
    }
  });
}
