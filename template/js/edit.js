Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

if (urlParams.habitId === undefined ) {
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
    var amPm;
    if (hour >= 0 && hour < 12) amPm = "AM";
    else {
      amPm = "PM";
      hour -= 12;
    }
    //conver hour to 12 hour clcok
    document.getElementById("hour").value = hour;
    document.getElementById("min").value = minutes;


    document.getElementById("ampm").value = amPm;
  }
  else {
    document.getElementById("myonoffswitch").checked = false;
    document.getElementById("time_selector").style.visibility = "hidden";
  }
}
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
    success: function(gameScore) {
    }
  });
}


function getHabitId() {
  return urlParams.habitId;
}
window.onload = getEditItem();
