$(document).ready(function() {
  getTasks();
  //event listeners
  $('#addTaskButton').on('click', createTask);
  $(document).on('click', '.complete-task-btn', completeTask);
}); // end doc ready

var completeTask = function() {
  console.log('in completeTask');
  var task_id = $(this).closest('.task').data('id');
  console.log('task to complete:', task_id);
  updateTaskCompletion(task_id);
}; // end completeTask

var createTask = function(){
  console.log('addTaskButton clicked');
  var objectToSend = {
    task: $('#taskIn').val()
  }; // end objectToSend
  //post task to server for insertion into database
  postTask(objectToSend);
  //clear input value
  $('#taskIn').val('');
}; // end addTaskClicked

var displayTasks = function(array) {
  console.log('in displayTasks', array);
  $('#tasksOut').html('<h2>Tasks</h2>');
  for (var i = 0; i < array.length; i++) {
    $('#tasksOut').append('<div class="task" data-id="' + array[i].id + '"></div>');
    var $taskDiv = $('#tasksOut').children().last();
    $taskDiv.append('<p class="task-name">' + array[i].name + '</p>');
    //append complete and delete buttons
    $taskDiv.append('<button class="complete-task-btn">Complete</button>');
    $taskDiv.append('<button class="delete-task-btn">Delete</button>');
  } // end for
}; // end displayTasks

var getTasks = function() {
  console.log('in runGetRoute');
  $.ajax({
    type: 'GET',
    url: '/task',
    success: function(response) {
      console.log('get route success:', response);
      displayTasks(response.tasks);
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
      console.log('POST RESPONSE:',response);
      //get and display new tasks
      getTasks();
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end runPostRoute

var updateTaskCompletion = function(num) {
  console.log('in updateTaskCompletion');
  $.ajax({
    type: 'PUT',
    url: '/task',
    data: {id: num},
    success: function(response) {
      console.log(response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end updateTaskCompletion
