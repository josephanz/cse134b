Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");
//Parse.initialize("3zsVEcWcoiBMqwA4kFftFSJk2kTIsCYY2Hc2dXJ0", "Gp6Mdb5ydKdPiiho32LOFzs5kcwMVqW3pVosxfJy");
var currentUser = Parse.User.current();

//make every page a log-in page, unless user is logged in. Then do a load-from-js.

if(currentUser){
	console.log("user is logged in as:");
	var userinfo = JSON.stringify(currentUser);
	console.log( eval ("(" + userinfo + ")"));
}
else{
	window.location = ("../src/login.html");
}