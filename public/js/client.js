$(document).ready(function() {
  runGetRoute();
  runPostRoute();
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

var runPostRoute = function() {
  console.log('in runPostRoute');
  var objectToSend = {
    thing: "soup"
  }; // end objectToSend
  $.ajax({
    type: 'POST',
    url: '/post',
    data: objectToSend,
    success: function(response) {
      console.log(response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end runPostRoute
