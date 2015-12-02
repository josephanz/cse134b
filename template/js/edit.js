Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");
//Parse.initialize("3zsVEcWcoiBMqwA4kFftFSJk2kTIsCYY2Hc2dXJ0", "Gp6Mdb5ydKdPiiho32LOFzs5kcwMVqW3pVosxfJy");

var fields = {
  // counts how many times a user visited the page
  visited: Parse.User.current().id
};
console.log("hi track count +1");
Parse.Analytics.track('editPage', fields);

var urlParams;
(window.onpopstate = function() {
  var match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function(s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    query = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query))
    urlParams[decode(match[1])] = decode(match[2]);
})();

if (urlParams.habitId === undefined) {
  alert("Warning!!! No Habit Selected");
}

function habit(habitId, habitName, iconSource, freqCount, freqDay, freqSet, freqSetMet, freqBest, notificationTime, freqPerWeek, parseObject) {
  this.habitId = habitId
  this.habitName = habitName;
  this.iconSource = iconSource;
  this.freqCount = freqCount; //how many times per day as of now
  this.freqDay = freqDay; //for which day
  this.freqSet = freqSet; // user set freq.
  this.freqSetMet = freqSetMet;
  this.freqBest = freqBest;
  this.notificationTime = notificationTime;
  this.freqPerWeek = freqPerWeek;
  this.parseObject = parseObject;
  this.updateField = function(field, newValue, localId) {
    updateHabit(this.parseObject, field, newValue);
  }
  this.delete = function() {
    deleteHabit(this.parseObject);
  }
}

var currentHabit;

function getEditItem() {
  var habitsArray = [];
  var objectID = urlParams.habitId;
  var Habits = Parse.Object.extend("Habits");
  var query = new Parse.Query(Habits);
  query.equalTo("user", Parse.User.current());
  query.equalTo("objectId", objectID);
  query.find({
    success: function(results) {
      $(".success").show();
      var resultLength = results.length;
      for (var i = 0; i < resultLength; i++) {
        var object = results[i];
        var habitItem = new habit(object.id, object.get("habitName"), object.get("icon").url(),
          object.get("freqCount"), object.get("freqDay"), object.get("freqSet"),
          object.get("freqSetMet"), object.get("freqBest"), object.get("notificationTime"), object.get("freqPerWeek"), object);

        habitsArray[i] = habitItem;
        currentHabit = habitItem;
        populateHabit(habitItem);
      }
      // alert("Successfully retrieved " + habitsArray.length);
      console.log("Successfully retrieved " + habitsArray.length);
      //JOE YOUR CODE GOES HERE
    },
    error: function(model, error) {
      console.log("failed");
    }
  });
  return habitsArray
}

function populateHabit(habit) {
  document.getElementById("title").value = habit.habitName
  document.getElementById("habitIcon").src = habit.iconSource;
  populateWeeklyFreq(habit.freqPerWeek);
  populateFreqPerDay(habit.freqSet - 1);
  console.log(habit.notificationTime);

  populateNotificationTime(habit.notificationTime)

}

function populateNotificationTime(notificationTime) {
  if (notificationTime !== null) {
    var notificationTime = notificationTime;
    var time = notificationTime.split(":");
    var hour = time[0];
    var minutes = time[1];
    var hourIndex;
    var minIndex;
    var amPmIndex;

    if (hour == 0){
      amPmIndex = 0;
      hourIndex = 11;
    }
    else if (hour >= 1 && hour < 12){
      amPmIndex = 0;
      hourIndex = hour - 1;
    }
    else if (hour == 12){
      amPmIndex = 1;
      hourIndex = 11;
    }
    else {
      amPmIndex = 1;
      hourIndex = (hour - 12) - 1;
    }
    if(minutes == 15){
      minIndex = 1;
    }
    else if(minutes == 30){
      minIndex = 2;
    }
    else if(minutes == 45){
      minIndex = 3;
    }
    else{
      minIndex = 0;
    }
    
    //conver hour to 12 hour clcok
    var dropDownHour = document.getElementById('hour');
    var dropDownMinute = document.getElementById('min');
    var dropDownAmPm = document.getElementById('ampm');
    dropDownHour.options[hourIndex].selected='true';
    dropDownMinute.options[minIndex].selected='true';
    dropDownAmPm.options[amPmIndex].selected='true'; 
    
  } else {
    document.getElementById("myonoffswitch").checked = false;
    visible = false;
    document.getElementById("time_selector").style.visibility = "hidden";
  }
}

function populateFreqPerDay(dailyFreq) {
  var daily = document.getElementsByName("day");
  console.log(dailyFreq);
  var index = dailyFreq;
  daily[index].checked = true;

}

function populateWeeklyFreq(freqPerWeek) {
  var weekFreq = document.getElementsByName("date");
  var results = freqPerWeek;

  for (var i = 0; i < weekFreq.length; i++) {
    weekFreq[i].checked = results[i];
  }
}

function updateField(habit, field, newValue) {
  habit.set(field, newValue);
  habit.save(null, {
    success: function(gameScore) {}
  });
}


function getHabitId() {
  return urlParams.habitId;
}
window.onload = getEditItem();


/**
 *
 * THE Code below is from add.js
 *
 */
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

    addHabit(getHabitId(), title, perWeek, Number(perDay), time);
  }
}
function isPerWeekFreqChanged(oldFreqPerWeek, newFreqPerWeek) {
  var arrayLength = oldFreqPerWeek.length;
  for (var i = 0; i < arrayLength; i++) {
    if (oldFreqPerWeek[i] !== newFreqPerWeek[i] )
      return true;
  }
  return false;
}
function addHabit(habitId, title, perWeek, perDay, notificationTime) {
  var TestObject = Parse.Object.extend("Habits");
  var testObject = new TestObject();

  testObject.id = habitId;
  //if new image blah
  var parseImg = createImage();
  console.log(currentHabit.freqSet +" " +  perDay +" " + currentHabit.freqPerWeek +" " +perWeek);
  if (currentHabit.freqSet != perDay ||  isPerWeekFreqChanged(currentHabit.freqPerWeek, perWeek) ) {
    testObject.set("freqCount", 0);
    testObject.set("freqDay", 0);
    testObject.set("freqSetMet", 0);
    testObject.set("freqBest", 0);
  }
  console.log("image is " + parseImg);
  testObject.set("habitName", title);
  testObject.set("freqPerWeek", perWeek)
  testObject.set("freqSet", perDay);
  testObject.set("notificationTime", notificationTime);



  //  testObject.set("icon", navv.get("icon"));
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

function setImageForIcon() {
  imageForIcon = undefined;
}

function createImage() {
  if (imageForIcon == undefined)
    return undefined;

  var fileUploadControl = $("#upload")[0];
  console.log("ddeee" + fileUploadControl);

  var file = imageForIcon;
  console.log("icon" + file);
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
  imageForIcon = undefined;

  if (name === "newicon") imageForIcon = imageRecovery;
  else imageForIcon = undefined;
}
function insertImage(imageSrc) {
  var iconTag = document.getElementById("testme");
  var imageId = "onclick=selectImage('newicon') />";
  iconTag.innerHTML = ' \
                  <img id = "newicon"  class="icon" src='+imageSrc+' '+imageId+' ';

}
function imageIsLoaded(e) {
  $('#upload').attr('style', "visibility: visibile;");
  $('#icon4').attr('style', "visiblility: visible;");
  $('#icon4').attr('onclick', "selectImage('icon4')");
  insertImage(e.target.result);
  //$('#icon4').attr('src', e.target.result);
  $('#icon4').css({
    "border": "3px inset #999999"
  });
};
