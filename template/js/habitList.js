Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");


function habit(habitId, habitName, iconSource, freqCount, freqDay, freqSet, freqSetMet, freqBest, parseObject) {
  this.habitId = habitId
  this.habitName = habitName;
  this.iconSource = iconSource;
  this.freqCount = freqCount; //how many times per day as of now
  this.freqDay = freqDay; //for which day
  this.freqSet = freqSet; // user set freq.
  this.freqSetMet = freqSetMet;
  this.freqBest = freqBest;
  this.parseObject = parseObject;
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

function deleteHabit(habit) {
  habit.destroy({
  success: function(myObject) {
    console.log("deleted habit");

    // The object was deleted from the Parse Cloud.
  },
  error: function(myObject, error) {
    console.log("cnt delte" + error);
    // error is a Parse.Error with an error code and message.
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
          object.get("freqSetMet"), object.get("freqBest"), object);

        habitsArray[i] = habitItem;

      }
      alert("Successfully retrieved " + habitsArray.length);
      //JOE YOUR CODE GOES HERE
      
      console.log(habitsArray)
      displayContent(habitsArray);
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
    valuesConcatenatedID = habitsArray[i]["habitId"] +"-"+habitsArray[i]["freqSetMet"]+"-"+habitsArray[i]["freqBest"]+"-"+habitsArray[i]["freqCount"]+"-"+habitsArray[i]["freqSet"]+"-"+habitsArray[i]["freqDay"];
    document.getElementById("habit-list").innerHTML += ' \
            <li> \
                <ul class="habit-info">\
                    <li><div class="habit-name">'+habitsArray[i]["habitName"]+'</div></li>\
                    <li><img class="habit-icon" src="'+habitsArray[i]["iconSource"]+'" alt="habit icon"></li>\
                </ul>\
                <div class="message" id='+valuesConcatenatedID+'>\
                    <span class="message-total">\
                        <strong class="freqSetMet">'+habitsArray[i]["freqSetMet"]+'</strong> days in a row! Best Record: <strong>'+habitsArray[i]["freqBest"]+'</strong><br>\
                        <svg height="25" width="150">\
                            <line x1="0" y1="0" x2="60" y2="0" style="stroke:rgba(65, 131, 215, 0.8);stroke-width:25" />\
                            <line x1="60" y1="0" x2="150" y2="0" style="stroke:rgba(171,171,171,0.6);stroke-width:25" />\
                        </svg>\
                    </span><br>\
                    <span class="message-today">Completed <strong>'+habitsArray[i]["freqCount"]+'/'+habitsArray[i]["freqSet"]+'</strong> for today!</span>\
                </div>\
                <div class="habit-op">\
                    <button type="button" class="op op-done" onclick="showMsg(this);" title="done">\
                        <img src="../img/done.svg" alt="Done">\
                    </button>\
                    <button type="button" class="op op-edit" onclick="location.href=edit.html" title="edit habit">\
                        <img src="../img/edit.svg" alt="Edit">\
                    </button>\
                    <button type="button" class="op op-del" onclick="deleteHabit(this);" title="delete habit">\
                        <img src="../img/delete.svg" alt="Del">\
                    </button>\
                </div>\
            </li>';
    
  }

}


function updateFreq(element,items){
  var Point = Parse.Object.extend("Habits");
  var point = new Point();
  point.id = items[0]; 
  alert(element);
  if(items[5] === '0'){ //met for the day
      if(items[3] < items[4]){

        // Set a new value on quantity
        point.set("freqCount", 1000);//parseInt(items[3])+1);
        point.set("freqDay", 1000),
        // Save
        point.save(null, {
          success: function(point) {
            // Saved successfully.
            console.log("updatedCount");
            console.log(element);
          },
          error: function(point, error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.
          }
        });
      }else{
        
        console.log("here");
      }
  }

}


getHabits();
