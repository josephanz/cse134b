Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");


function habit(habitId, habitName,iconSource,freqCount,freqDay,freqSet,freqSetMet,freqBest ) {
    this.habitId = habitId
    this.habitName = habitName;
    this.iconSource = iconSource;
    this.freqCount = freqCount;  //how many times per day as of now
    this.freqDay = freqDay;       //for which day
    this.freqSet = freqSet;       // user set freq.
    this.freqSetMet = freqSetMet;
    this.freqBest = freqBest;
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
          var habit = new habit(object.id, object.get("habitName"), object.get("icon").url(),
                            object.get("freqCount"), object.get("freqDay"),object.get("freqSet"),
                            object.get("freqSetMet"), object.get("freqBest"));

          habitsArray[i] = habit;


      }
      alert("Successfully retrieved " + habitsArray.length);
      //JOE YOUR CODE GOES HERE

    },
    error: function(model, error) {
      $(".error").show();
    }
  });
}
