$(document).ready(function() {
  getTasks();
  //event listeners
  $('#addTaskButton').on('click', createTask);
  $(document).on('click', '.complete-task-btn', completeTask);
  $(document).on('click', '.delete-task-btn', deleteTask);
}); // end doc ready

var completeTask = function() {
  console.log('in completeTask');
  var objectToSend = {
    id: $(this).closest('.task').data('id')
  }; // end objectToSend
  //update task completion
  $.ajax({
    type: 'PUT',
    url: '/task',
    data: objectToSend,
    success: function(response) {
      var task_id = response;
      //update appearance of completed task
      updateCompletedAppearance(task_id);
      //getTasks();
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end completeTask

var updateCompletedAppearance = function(num) {
  console.log('in updateCompleteOnDOM:', num);
  //select div of completed task using data attribute
  var $completed = $('#tasksOut').find("[data-id='" + num + "']");
  //change background color to green
  $completed.css('background-color', 'green');
}; // end updateCompleteOnDOM

var createTask = function(){
  console.log('in createTask');
  var objectToSend = {
    task: $('#taskIn').val()
  }; // end objectToSend
  //post task to server for insertion into database
  postTask(objectToSend);
  //clear input value
  $('#taskIn').val('');
}; // end createTask

var deleteTask = function() {
  console.log('in deleteTask');
  var objectToSend = {
    id: $(this).closest('.task').data('id')
  }; // end objectToSend
  $.ajax({
    type: 'DELETE',
    url: '/task',
    data: objectToSend,
    success: function(response) {
      console.log(response);
      getTasks();
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end deleteTask

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
  console.log('in getTasks');
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
}; // end getTasks

var postTask = function(object) {
  console.log('in postTask');
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
}; // end postTask
