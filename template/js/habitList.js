Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");


function habit(habitId, habitName, iconSource, freqCount, freqDay, freqSet, freqSetMet, freqBest, completedDayDate, updatedFreqDate, notificationTime, freqPerWeek, parseObject) {
  this.habitId = habitId
  this.habitName = habitName;
  this.iconSource = iconSource;
  this.freqCount = freqCount; //how many times per day as of now
  this.freqDay = freqDay; //for which day
  this.freqSet = freqSet; // user set freq.
  this.freqSetMet = freqSetMet;
  this.freqBest = freqBest;
  this.completedDayDate = completedDayDate;
  this.updatedFreqDate = updatedFreqDate;
  this.notificationTime = notificationTime;
  this.freqPerWeek = freqPerWeek;
  this.parseObject = parseObject;
  console.log("Parse Object = " + parseObject);
  this.updateField = function(field, newValue, localId) {
    updateHabit(this.parseObject, field, newValue);
  }
  this.delete = function() {
    deleteHabit(this.parseObject);
  }
}

function updateField(habit, field, newValue) {
  habit.set(field, newValue);
  habit.save(null, {
    success: function(gameScore) {
      console.log("updated field");
    }
  });
}

function deleteTheHabit(id) {
  console.log("entered the delete");
  var Habit = Parse.Object.extend("Habits");
  var query = new Parse.Query(Habit);
  query.get(id, {
    success: function(myObj) {
      // The object was retrieved successfully.
      myObj.destroy({});
      console.log("should have deleted");
      //location.reload();  //reload the page for the notification to go away

      var fields = {
        user: String(Parse.user.current().id)
      };
      Parse.Analytics.track('deleteHabit', fields);
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
    }
  });
}

function getHabits() {
  var habitsArray = [];

  var Habits = Parse.Object.extend("Habits");
  var query = new Parse.Query(Habits);
  query.equalTo("user", Parse.User.current());
  query.find({
    success: function(results) {
      $(".success").show();
      var resultLength = results.length;
      for (var i = 0; i < resultLength; i++) {
        var object = results[i];
        var habitItem = new habit(object.id, object.get("habitName"), object.get("icon").url(),
            object.get("freqCount"), object.get("freqDay"), object.get("freqSet"),
            object.get("freqSetMet"), object.get("freqBest"), object.get("completedDayDate"),
            object.get("updatedFreqCount"), object.get("notificationTime"), object.get("freqPerWeek"),object);


        habitsArray[i] = habitItem;

      }
      //alert("Successfully retrieved " + habitsArray.length);
      if(habitsArray.length == 0) {
        window.location = "../src/welcome.html";
      }
      console.log(habitsArray)
      displayContent(habitsArray);
      makeNotifications(habitsArray);
    },
    error: function(model, error) {
      $(".error").show();
    }
  });
}

function displayContent(habitsArray){

  var habitsArrayLen = habitsArray.length;
  console.log(habitsArray);
  console.log("here " +habitsArrayLen);
  var i;
  for(i = 0; i< habitsArrayLen; i++){
    valuesConcatenatedID = habitsArray[i]["habitId"];
    var edit = "'../src/edit.html?habitId="+habitsArray[i]["habitId"]+"'"
    var checkButton = ""
    if(habitsArray[i]["freqDay"] == 0&&habitsArray[i]["freqSet"] > habitsArray[i]["freqCount"]){
      checkButton = '<button type="button" id="'+habitsArray[i]["habitId"]+'-checkButton" class="op op-done" onclick="showMsg(this);" title="done">\
                        <img src="../img/done.svg" alt="Done">\
                    </button>';
    }
    document.getElementById("habit-list").innerHTML += ' \
            <li> \
                <ul class="habit-info">\
                    <li><div class="habit-name">'+habitsArray[i]["habitName"]+'</div></li>\
                    <li><img class="habit-icon" src="'+habitsArray[i]["iconSource"]+'" alt="habit icon"></li>\
                </ul>\
                <strong id="'+habitsArray[i]["habitId"]+'-completedDayDate" style="visibility: hidden;">'+habitsArray[i]["completedDayDate"]+'</strong>\
                <strong id="'+habitsArray[i]["habitId"]+'-updatedFreqDate" style="visibility: hidden;">'+habitsArray[i]["updatedFreqDate"]+'</strong>\
                <div class="message" id='+valuesConcatenatedID+'>\
                    <span class="message-total">\
                        <strong id="'+habitsArray[i]["habitId"]+'-freqDay" style="visibility: hidden;">'+habitsArray[i]["freqDay"]+'</strong>\
                        <strong id="'+habitsArray[i]["habitId"]+'-freqSetMet">'+habitsArray[i]["freqSetMet"]+'</strong> days in a row! Best Record: <strong id="'+habitsArray[i]["habitId"]+'-freqBest">'+habitsArray[i]["freqBest"]+'</strong><br>\
                        <progress id="'+habitsArray[i]["habitId"]+'-progress" value="'+habitsArray[i]["freqCount"]+'" max="'+habitsArray[i]["freqSet"]+'"></progress>\
                    </span><br><br>\
                    <span class="message-today">Completed <strong id="'+habitsArray[i]["habitId"]+'-freqCount">'+habitsArray[i]["freqCount"]+'</strong>/<strong id="'+habitsArray[i]["habitId"]+'-freqSet">'+habitsArray[i]["freqSet"]+'</strong> for today!</span>\
                </div>\
                <div class="habit-op">\
                  <button type="button" id="'+habitsArray[i]["habitId"]+'-checkButton" class="op op-done" onclick="showMsg(this);" title="done">\
                        <img src="../img/done.svg" alt="Done">\
                    </button>\
                    <button type="button" class="op op-edit" onclick="location.href='+edit+'" title="edit habit">\
                        <img src="../img/edit.svg" alt="Edit">\
                    </button>\
                    <button type="button" class="op op-del" onclick="deleteHabit(this);" title="delete habit">\
                        <img src="../img/delete.svg" alt="Del">\
                    </button>\
                </div>\
            </li>';



  }

}

function removeHTMLElement(id) {

  return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}




function updateFreq(id){
  var habitId = id;
  var freqSetMet = parseInt(document.getElementById(habitId + "-freqSetMet").innerHTML);
  var freqBest = parseInt(document.getElementById(habitId + "-freqBest").innerHTML);
  var freqCount = parseInt(document.getElementById(habitId + "-freqCount").innerHTML);
  var freqSet = parseInt(document.getElementById(habitId + "-freqSet").innerHTML);
  var freqDay = parseInt(document.getElementById(habitId + "-freqDay").innerHTML);
  var updatedFreqDate = document.getElementById(habitId + "-updatedFreqDate").innerHTML;
  var completedDayDate = document.getElementById(habitId + "-completedDayDate").innerHTML;
  var updateList = [];

  var completed;
  var updated;
  var currentDate = new Date().toString();


  var l = currentDate.split(" ");
  currentDate = l[1]+l[2]+l[3];
  console.log("currentDate = "+ currentDate)

  if(updatedFreqDate != "undefined"){
    console.log("This one");
    var l = updatedFreqDate.split(" ");
    console.log(l);
    updated = l[1]+l[2]+l[3];
    console.log(updated);
  }

  if(completedDayDate != "undefined"){
    console.log("NO this one");
    var l = completedDayDate.split(" ");
    console.log(l);
    completed = l[1]+l[2]+l[3];
    console.log(completed);

  }


  if(currentDate != "undefined" && completed != "undefined" && currentDate != completed && currentDate !=updated){
    console.log("holla at yo homeboy");
    updateList = [];
    freqCount =0;
    document.getElementById(habitId + "-freqCount").innerHTML = freqCount;
    updateList.push({"key": "freqCount", "val":freqCount});
    freqDay = 0;
    document.getElementById(habitId + "-freqDay").innerHTML = freqDay;
    updateList.push({"key":"freqDay", "val": freqDay});
    var d = new Date();
    updateList.push({"key": "updatedFreqDate", "val": d})
    document.getElementById(habitId + "-updatedFreqDate").innerHTML = d.toString();
    updateById(habitId,updateList);
  }

  if(freqDay == 0){
      updateList = [];
      if(freqCount < freqSet){
        freqCount +=1;
        console.log("entered updated count" + freqCount);
        document.getElementById(habitId + "-freqCount").innerHTML = freqCount;
        document.getElementById(habitId + "-progress").value = freqCount;
        updateList.push({"key": "freqCount", "val":freqCount});
        //update on server
        if(freqCount == freqSet){
          var d = new Date();
          updateList.push({"key": "completedDayDate", "val": d});
          removeHTMLElement(habitId+"-checkButton");
          freqDay = 1;
          document.getElementById(habitId + "-freqDay").innerHTML = freqDay;
          updateList.push({"key":"freqDay", "val": freqDay});
          freqSetMet += 1;
          document.getElementById(habitId + "-freqSetMet").innerHTML = freqSetMet;
          updateList.push({"key":"freqSetMet","val": freqSetMet});
          if(freqSetMet > freqBest){
            freqBest = freqSetMet;
            document.getElementById(habitId + "-freqBest").innerHTML = freqBest;
            updateList.push({"key":"freqBest", "val": freqBest});

          }
        }
    }
    updateById(habitId,updateList);

  }

}

function updateById(id,list){
  var Point = Parse.Object.extend("Habits");
  var point = new Point();
  point.id = id;
  var i;
  console.log(list);
  for(i in list){
    point.set(list[i].key, list[i].val);//parseInt(items[3])+1);
    console.log(list[i].key +","+list[i].val);
  }
  // Save
  point.save(null, {
    success: function(point) {
      // Saved successfully.
      console.log("updated");

    },
    error: function(point, error) {
      // The save failed.
      // error is a Parse.Error with an error code and description.
    }
  });

}



function sendNotification(title, notiBody, notiIcon) {
  if(Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  var n  = new Notification(title, {
    body: notiBody,
    icon: notiIcon
  });
  try {
    if(window.external && window.external.msIsSiteMode() !== undefined) {
      if(window.external.msIsSiteMode()) {
        createPopUp(title, notiBody, notiIcon);
      } else {
        createPopUp("Enable Notification", "Please pin the site to enable notifications", "");
      }
    }
  } catch(ex) {
    console.log("Site mode is not supported");
  }
}

function createPopUp(title, notiBody, notiIcon) {
  var popup = document.createElement("div");
  popup.innerHTML = "<strong>" + title + "</strong>" + "<br>" + notiBody;
  popup.className = 'popup';
  popup.id = 'popup';
  popup.style.display = 'none';
  popup.onclick = function() {
    $('.popup').fadeOut(400);
    var element = document.getElementById('popup');
    console.log(element.parentNode);
    element.parentNode.removeChild(element);
  }
  document.body.appendChild(popup);
  $('.popup').fadeIn(400);
}

function executeAt(hour, minute, freqPerWeek, habitId, func) {
  var timeDiff = getTimeDiff(hour, minute, freqPerWeek);
  if(timeDiff != -1) {
    setTimeout(func, timeDiff);
  }
}

function compare(a, b) {
  if(a.notificationTime > b.notificationTime) {
    return 1
  } else {
    return -1;
  }
}

function getTimeDiff(hour, minute, freqPerWeek) {
  var currentDay = new Date().getDay();
  var currentHour = new Date().getHours();
  var currentMin = new Date().getMinutes();
  if(freqPerWeek[currentDay] == true) {
    var milisec = hour * 3600 * 1000 + minute * 60 * 1000;
    var currentMilisec = currentHour * 3600 * 1000 + currentMin * 60 * 1000;
    if(currentMilisec > milisec) {
      console.log("Time is in the past");
      console.log(hour + ":" + minute);
      return -1;
    } else {
      console.log("Valid time");
      console.log(milisec - currentMilisec);
      return milisec - currentMilisec;
    }
  } else {
    console.log("Not today");
    return -1;
  }
}

//set time out functions for notifications
function makeNotifications(habitsArray) {
  console.log("makeNotifications() called");
  habitsArray.sort(compare);
  var i;
  var length = habitsArray.length;
  var index = 0;
  for(i = 0; i < length; i++) {
    var days = habitsArray[i].freqPerWeek;
    var time = habitsArray[i].notificationTime;
    var hourMinute = time.split(":");
    var hour = Number(hourMinute[0]);
    var minute = Number(hourMinute[1]);
    var habitId = habitsArray[i].habitId;
    console.log("time: " + time + " habit: " + habitsArray[i].habitName);
    console.log(habitsArray[i].freqPerWeek);
    console.log(habitsArray[i].habitId);
    executeAt(hour, minute, days, habitId, function() {
      var title = habitsArray[index].habitName;
      var body = "Have you " + title + " today?";
      var icon = habitsArray[index].iconSource;
      var Habits = Parse.Object.extend("Habits");
      var query = new Parse.Query(Habits);
      var habitID = habitsArray[index].habitID;
      query.equalTo("user", Parse.User.current());
      query.equalTo("objectId", habitID);
      index++;
      query.find({
        success: function(results) {
          if(results.length != 0) {
            sendNotification(title, body, icon);

            var fields = {
              user: String(Parse.User.current().id),
              habitId: habitID
            };

            Parse.Analytics.track('sendNotification', fields);
          } else {
            console.log("dont send notification");
          }
        },
        error: function(model, error) {
          console.log("failed");
        }
      });
    });
  }
}

getHabits();
