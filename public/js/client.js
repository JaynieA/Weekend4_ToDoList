$(document).ready(function() {
  runGetRoute();

  $('#addTaskButton').on('click', function() {
    console.log('addTaskButton clicked');
    var objectToSend = {
      task: $('#taskIn').val()
    }; // end objectToSend
    runPostRoute(objectToSend);
  }); // end addTaskButton
});

var runGetRoute = function() {
  console.log('in runGetRoute');
  $.ajax({
    type: 'GET',
    url: '/get',
    success: function(response) {
      console.log('get route success:', response);
    }, // end success
    error: function(err) {
      console.log('get route error:', err);
    } // end error
  }); // end ajax
}; // end runGetRoute

var runPostRoute = function(object) {
  console.log('in runPostRoute');
  $.ajax({
    type: 'POST',
    url: '/post',
    data: object,
    success: function(response) {
      console.log(response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end runPostRoute
