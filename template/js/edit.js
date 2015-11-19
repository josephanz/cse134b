Parse.initialize("M0a7TBns2wo7HMdoULhac86LMnpjPothTzst4a1T", "cV4npfDqaSpeTLSwwyhYxg8CvoWqJc0QjXlM37c0");

function editHabit(habitId) {
  var Habit = Parse.Object.extend("Habits");
  var query = new Parse.Query(Habit);
  query.get(habitId, {
    success: function(Habit) {
      
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    }
  });

}
