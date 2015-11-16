Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");

var icons = [];

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
  for (var i = 0; i < week.length; i++) {
    if (week[i].checked) {
      perWeek[i] = true;
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
    }
    console.log(perDay + "days baby");
  }


  var hour = document.getElementById("hour").value;
  var ampm = document.getElementById("ampm").value;
  if (document.getElementById("ampm").value == "PM") {
    hour = hour * 1 + 12;
  }
  var min = document.getElementById("min").value;



  var title = document.getElementById("title").value;
  var time = hour + ":" + min;
  console.log(title + " p: " + perWeek + " D: " + perDay + " t " + time);;


  addHabit(title, perWeek, perDay, time);
  console.log(document.getElementById("title").value);

  //document.location.href = "list.html";
}

$(function() {
  $(":file").change(function() {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(this.files[0]);
    }
  });
});


function imageIsLoaded(e) {
  //  $('#upload').remove();
  $('#icon4').attr('style', "visiblility: visible;");
  $('#icon4').attr('onclick', "selectImage('icon4')");
  $('#icon4').attr('src', e.target.result);
};

function addHabit(title, perWeek, perDay, notificationTime) {
  var TestObject = Parse.Object.extend("Habits");
  var testObject = new TestObject();
  testObject.set("habitName", title);
  testObject.set("freqCount", 0);
  testObject.set("freqDay", perDay);
  testObject.set("freqPerWeek", perWeek)
  testObject.set("freqSet", 0);
  testObject.set("freqSetMet", 0);
  testObject.set("freqBest", 0);
  testObject.set("notificationTime", notificationTime);


  //if new image blah
  var parseImg = createImage();
  //  testObject.set("icon", navv.get("icon"));
testObject.set("icon", parseImg);
  testObject.set("user", Parse.User.current());
  testObject.setACL(new Parse.ACL(Parse.User.current()));
  testObject.save(null, {
    success: function(object) {
      $(".success").show();
      alert("Successfully retrieved " + " scores.");
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
  if (fileUploadControl.files.length > 0) {
    var file = fileUploadControl.files[0];

    var name = "photo.jpg";
    var parseFile = new Parse.File(name, file);
    /*    parseFile.save().then(function() {			return parseFile;
    		}, function(error) {
    			return null;
    		}); */
  }
  return parseFile;
}
