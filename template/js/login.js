



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
    
    if( validateLogin() == true ){
        if(usermail == sessionStorage.getItem("usermail") && password == sessionStorage.getItem("password")){
            alert("login success");
            return true;
        }
        else{
            alert("incorrect login information");
            return false;
        }
    }
    return false;
}


function onClickSignUp() {
    var usermail = document.getElementById("usermail").value;
    var password = document.getElementById("password").value;
    if( validateSignup() == true ){
        sessionStorage.setItem("usermail", usermail);
        sessionStorage.setItem("password", password);
        
        var signUpText = document.getElementById("signInMessage");
        signUpText.style.display = "block";
    }
    else{return false;}
  
}
