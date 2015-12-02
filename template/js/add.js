Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");
//Parse.initialize("3zsVEcWcoiBMqwA4kFftFSJk2kTIsCYY2Hc2dXJ0", "Gp6Mdb5ydKdPiiho32LOFzs5kcwMVqW3pVosxfJy");
var icons = [];
var images = [];
(window.onpopstate = function() {
	getDefaultImages();
})();

function getDefaultImages() {


	var Images = Parse.Object.extend("Icons");
	var query = new Parse.Query(Images);

	query.find({
		success: function(results) {
			$(".success").show();
			var resultLength = results.length;
			for (var i = 0; i < resultLength; i++) {
				var object = results[i];
				images[i] = results[i];
				console.log("hi" + object.get("icon"));
			}

		},
		error: function(model, error) {
			$(".error").show();
		}
	});
}

var notAnewFile = false;
function selectImage(name) {
  //Clear all the other effects
  var arr = document.getElementsByClassName("icon");
  for (var i = 0; i < arr.length; i++) {
  	arr[i].style.border = "3px inset rgba(0,0,0,0)";
  }
  //document.getElementById('icon2').style.border = "3px inset rgba(0,0,0,0)";
  //document.getElementById('icon3').style.border = "3px inset rgba(0,0,0,0)";
  var image = document.getElementById(name);

  image.style.border = "3px inset #999999";
  switch (name) {
  	case "icon1":
  	imageForIcon = images[0].get("icon");
  	notAnewFile = true;
  	break;
  	case "icon2":
  	imageForIcon = images[1].get("icon");
  	notAnewFile = true;
  	break;
  	case "newicon":
  	imageForIcon = imageRecovery;
  	notAnewFile = false;
  	break;

  	default:
  	imageForIcon = undefined;
  }
}

//if(typeof(Storage) !== "undefined") {
//	localStorage.setItem("john", "smith");
//	localStorage.setItem("myCat", "Tom2323");
//}
//console.log(document.getElementById("result"));

var visible = true;

function toggle() {
	var timeField = document.getElementById("time_selector");
	if (visible) {
		timeField.style.visibility = "hidden";
		console.log("hi");
	} else {
		timeField.style.visibility = "visible";
		console.log("bye");
	}
	visible = !visible;
}



function saveIt() {
	var week = document.getElementsByName("date");
	var perWeek = [];
	var checkedWeek = false;
	var checkedDay = false;
	for (var i = 0; i < week.length; i++) {
		if (week[i].checked) {
			perWeek[i] = true;
			checkedWeek = true;
		} else {
			perWeek[i] = false;
		}
		console.log(perWeek[i]);
	}

	var daily = document.getElementsByName("day");
	var perDay = 0;
	for (var i = 0; i < daily.length; i++) {
		if (daily[i].checked) {
			perDay = daily[i].value;
			checkedDay = true;
		}
		console.log(perDay + " days baby");
	}


	var hour = document.getElementById("hour").value;
	var ampm = document.getElementById("ampm").value;
	if (document.getElementById("ampm").value == "PM") {
		if (hour != 12) {
			hour = hour * 1 + 12;
		}

	} else if (hour == 12) {
		hour = 0;
	}

	var min = document.getElementById("min").value;



	var title = document.getElementById("title").value;
	var time = hour + ":" + min;

	if (document.getElementById("myonoffswitch").checked == false) {
		time = null;
	}
	console.log(title + " p: " + perWeek + " D: " + perDay + " t " + time);;

  //var selectedFile = document.getElementById("upload").files[0];
  
  if (title == "" || title == null) {
  	alert("please put a habit name");
  } else if (!checkedWeek) {
  	alert("please select weekly frequency");
  } else if (!checkedDay) {
  	alert("please select daily frequency");
  } else {

  	addHabit(title, perWeek, Number(perDay), time);
  }
}

function addHabit(title, perWeek, perDay, notificationTime) {
	var TestObject = Parse.Object.extend("Habits");
	var testObject = new TestObject();
  //if new image
  var parseImg = createImage();

  testObject.set("habitName", title);
  testObject.set("freqCount", 0);
  testObject.set("freqDay", 0);
  testObject.set("freqPerWeek", perWeek)
  testObject.set("freqSet", perDay);
  testObject.set("freqSetMet", 0);
  testObject.set("freqBest", 0);
  testObject.set("notificationTime", notificationTime);

  testObject.set("icon", parseImg);
  testObject.set("user", Parse.User.current());
  testObject.setACL(new Parse.ACL(Parse.User.current()));
  testObject.save(null, {
  	success: function(object) {
  		$(".success").show();
  		document.location.href = "list.html";
  	},
  	error: function(model, error) {
  		$(".error").show();
  	}
  });
}

function getIcons() {
	var Icons = Parse.Object.extend("Icons");
	var query = new Parse.Query(Icons);
	query.find({
		success: function(results) {
			$(".success").show();
			var resultLength = results.length;
			for (var i = 0; i < resultLength; i++) {
				icons[i] = results[i];
			}
			alert("Successfully retrieved " + resultLength);


		},
		error: function(model, error) {
			$(".error").show();
		}
	});
}

function createImage() {
	var fileUploadControl = $("#upload")[0];
	console.log("ddeee" + fileUploadControl);
  //if (fileUploadControl.files.length > 0) {
  	var file = imageForIcon;
  	console.log("icon" + file);
  	if (notAnewFile) return file;
  	var name = "photo.jpg";
  	var parseFile = new Parse.File(name, file);

  	return parseFile;
  }

var imageForIcon; //updated in teh listner and used to craeteImage
var imageRecovery;
$(function() {
	$(":file").change(function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			var size = document.getElementById('upload').files[0].size;
			if (size > 1024 * 2000) {
				document.getElementById("iconupload").style.color = "red";
				document.getElementById("iconupload").innerHTML = "Habit Icon: file size must not exceed 2mb, size is " + size + " bytes";
			} else {
				reader.onload = imageIsLoaded;
				console.log("dyb dyb" + this.files[0]);
				imageForIcon = this.files[0];
				imageRecovery = this.files[0];
				reader.readAsDataURL(this.files[0]);
			}
		}
	});
});

function insertImage(imageSrc) {
	var iconTag = document.getElementById("inserticon");
	var imageId = "onclick=selectImage('newicon') />";
	iconTag.innerHTML = ' \
	<img id = "newicon"  class="icon" src=' + imageSrc + ' ' + imageId + ' ';

}

function imageIsLoaded(e) {
	$('#upload').attr('style', "visibility: visibile;");
	$('#icon4').attr('style', "visiblility: visible;");
	$('#icon4').attr('onclick', "selectImage('icon4')");
  //  $('#icon4').attr('src', e.target.result);
  insertImage(e.target.result);
  $('#icon4').css({
  	"border": "3px inset #999999"
  });
};
