
Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");


function validateLogin() {
    var usermail = document.getElementById("usermail").value;
    var password = document.getElementById("password").value;

    if( usermail == null || usermail == ""){
        alert("User email must be filled out");
        return false;
    }
    if( password == null || password == ""){
        alert("Invalid password");
        return false;
    }
    return true;
}

function validateSignup() {
    var usermail = document.getElementById("usermail").value;
    var password = document.getElementById("password").value;

    if( usermail == null || usermail == ""){
        alert("User email must be filled out");
        return false;
    }
    if( password == null || password == ""){
        alert("Invalid password");
        return false;
    }
    return true;

}
function onClickLogin() {
    var usermail = document.getElementById("usermail").value;
    var password = document.getElementById("password").value;

    if( validateLogin() === true ){
      login(usermail, password);
  }

}


function onClickSignUp() {
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
      alert("Hooray! Let them use the app now.");
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
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
      alert(error);

    }
  });
}
