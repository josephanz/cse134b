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
    var edit = "'../src/edit.html?id="+habitsArray[i]["habitId"]+"'"
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
                <div class="message" id='+valuesConcatenatedID+'>\
                    <span class="message-total">\
                        <strong id="'+habitsArray[i]["habitId"]+'-freqDay" style="visibility: hidden;">'+habitsArray[i]["freqDay"]+'</strong>\
                        <strong id="'+habitsArray[i]["habitId"]+'-freqSetMet">'+habitsArray[i]["freqSetMet"]+'</strong> days in a row! Best Record: <strong id="'+habitsArray[i]["habitId"]+'-freqBest">'+habitsArray[i]["freqBest"]+'</strong><br>\
                        <progress value="1" max="2"></progress>\
                    </span><br><br>\
                    <span class="message-today">Completed <strong id="'+habitsArray[i]["habitId"]+'-freqCount">'+habitsArray[i]["freqCount"]+'</strong>/<strong id="'+habitsArray[i]["habitId"]+'-freqSet">'+habitsArray[i]["freqSet"]+'</strong> for today!</span>\
                </div>\
                <div class="habit-op">'+checkButton+'\
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
  var updateList = []


  if(freqDay == 0){
      if(freqCount < freqSet){
        freqCount +=1; 
        console.log("entered updated count" + freqCount);
        document.getElementById(habitId + "-freqCount").innerHTML = freqCount;
        updateList.push({key: "freqCount", "val":freqCount});
        //update on server
        if(freqCount == freqSet){
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

function executeAt(hour, minute, freqPerWeek, func) {
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

function getHabitsForNotifications(habitsArray) {
  var habitsList = [];
  var length = habitsArray.length;
  var i;
  for(i = 0; i < length; i++) {
      var time = habitsArray[i].notificationTime;
      if(time == null) {
        continue;
      }
      var hourMinute = time.split(":");
      var hour = Number(hourMinute[0]);
      var minute = Number(hourMinute[1]);
      var freqPerWeek = habitsArray[i].freqPerWeek;
      var timeDiff = getTimeDiff(hour, minute, freqPerWeek);
      if (timeDiff != -1) {
        habitsList.push(habitsArray[i]);
      }
  }
  return habitsList;
}

//set time out functions for notifications
function makeNotifications(habitsArray) {
  console.log("makeNotifications() called");
  var habitsList = getHabitsForNotifications(habitsArray);
  habitsList.sort(compare);
  var i;
  var length = habitsList.length;
  var index = 0;
  for(i = 0; i < length; i++) {
    var days = habitsList[i].freqPerWeek;
    var time = habitsList[i].notificationTime;
    var hourMinute = time.split(":");
    var hour = Number(hourMinute[0]);
    var minute = Number(hourMinute[1]);

    console.log("time: " + time + " habit: " + habitsList[i].habitName);
    console.log(habitsList[i].freqPerWeek);

    executeAt(hour, minute, days, function() {
      var title = habitsList[index].habitName;
      var body = "Have you " + title + " today?";
      var icon = habitsList[index].iconSource;
      sendNotification(title, body, icon);
      index++;
    });
  } 
}

getHabits();
