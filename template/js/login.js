Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");
//Parse.initialize("3zsVEcWcoiBMqwA4kFftFSJk2kTIsCYY2Hc2dXJ0", "Gp6Mdb5ydKdPiiho32LOFzs5kcwMVqW3pVosxfJy");
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
	if( password.length < 6 ){
		errorText.innerHTML = "Error: Password must be 6 or more characters";
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
      //console.log(error.code);
      errorText.innerHTML = "Error: " + error.message;
      errorText.style.display = "block";
      
      if(error.message.includes("taken")){
        var dimensions = {
          error: 'email already taken'
        };
        
        Parse.Analytics.track('signupErrors', dimensions);
      }
      if(error.message.includes("invalid")){
        var dimensions = {
          error: 'invalid email format'
        };
        
        Parse.Analytics.track('signupErrors', dimensions);
      }
    }
  });
}

function login(username, password) {
  Parse.User.logIn(username, password, {
    success: function(user) {
      window.location = ("../src/list.html");
    },
    error: function(user, error) {
        console.log(error.code);
        errorText.innerHTML = "Error: " + error.message;
        errorText.style.display = "block";
        document.getElementById("signInMessage").value = 'Email or Password is incorrect';
        var dimensions = {
          error: 'incorrect credentials'
        };
        
        Parse.Analytics.track('signupErrors', dimensions);
    }
  });
}


