$(document).ready(function() {
  getTasks();
  $('#addTaskButton').on('click', addTaskClicked);

}); // end doc ready

var addTaskClicked = function(){
  console.log('addTaskButton clicked');
  var objectToSend = {
    task: $('#taskIn').val()
  }; // end objectToSend
  //post task to server for insertion into database
  postTask(objectToSend);
  //clear input value
  $('#taskIn').val('');
}; // end addTaskClicked

var getTasks = function() {
  console.log('in runGetRoute');
  $.ajax({
    type: 'GET',
    url: '/task',
    success: function(response) {
      console.log('get route success:', response);
    }, // end success
    error: function(err) {
      console.log('get route error:', err);
    } // end error
  }); // end ajax
}; // end runGetRoute

var postTask = function(object) {
  console.log('in runPostRoute');
  $.ajax({
    type: 'POST',
    url: '/task',
    data: object,
    success: function(response) {
      console.log(response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end runPostRoute
