Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");


function getEditItem() {
  var habitsArray = [];
  var objectID = 3LPM4yvw7w;
  var Habits = Parse.Object.extend("Habits");
  var query = new Parse.Query(Habits);
  query.equalTo("user", Parse.User.current());
  query.equalTo("objectID", objectID);
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
      }
      // alert("Successfully retrieved " + habitsArray.length);
      console.log("Successfully retrieved " + habitsArray.length);
      //JOE YOUR CODE GOES HERE
    },
    error: function(model, error) {
      $(".error").show();
    }
  });
  return habitsArray
}


function updateField(habit, field, newValue) {
  habit.set(field, newValue);
  habit.save(null, {
    success: function(gameScore) {
      console.log("updated field");
    }
  });
}


