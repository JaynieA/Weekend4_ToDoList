//TODO: disable buttons that have already been updated/completed from being clicked again

$(document).ready(function() {
  init();
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
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end completeTask

var createTask = function(e){
  e.preventDefault();
  console.log('in createTask');
  if (validateTaskIn()){
    var objectToSend = {
      task: $('#taskIn').val()
    }; // end objectToSend
    //post task to server for insertion into database
    postTask(objectToSend);
  } // end if
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
      console.log('deleted id number:',response);
      //store the id of the deleted task
      var num = response;
      //hide the deleted task from DOM using data attribute
      var $deleted = $('#tasksOut').find("[data-id='" + num + "']");
      $deleted.hide();
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end deleteTask

var displayTasks = function(array) {
  console.log('in displayTasks', array);
  $('#tasksOut').html('<h2 class="tasks-header">Tasks</h2>');
  for (var i = 0; i < array.length; i++) {
    $('#tasksOut').append('<div class="task" data-id="' + array[i].id + '"></div>');
    var $taskDiv = $('#tasksOut').children().last();
    //append delete buttons
    $taskDiv.append('<button class="btn complete-task-btn btn-sm"></button>');
    $completeButton = $taskDiv.children().last();
    $completeButton.append('<i class="fa fa-square-o fa-lg" aria-hidden="true"></i>');
    //append task name
    $taskDiv.append('<p class="task-name">' + array[i].name + '</p>');
    //append complete buttons
    $taskDiv.append('<button class="btn delete-task-btn btn-sm"></button>');
    $deleteButton = $taskDiv.children().last();
    $deleteButton.append('<i class="fa fa-trash fa-lg" aria-hidden="true"></i>');
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

var init = function() {
  console.log('in init');
  getTasks();
  //event listeners
  $(document).on('click', '.complete-task-btn', completeTask);
  $(document).on('click', '.delete-task-btn', deleteTask);
}; // end init

var postTask = function(object) {
  console.log('in postTask');
  $.ajax({
    type: 'POST',
    url: '/task',
    data: object,
    success: function(response) {
      console.log('POST RESPONSE:',response);
      //reset task input validation alert appearance
      $('#taskIn').removeClass('bad-input');
      //get and display new tasks
      getTasks();
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end postTask

var updateCompletedAppearance = function(num) {
  console.log('in updateCompleteOnDOM:', num);
  //select div of completed task using data attribute
  var $completed = $('#tasksOut').find("[data-id='" + num + "']");
  //change completed button to checked icon
  $completed.find('.complete-task-btn').html('<i class="fa fa-check-square-o fa-lg" aria-hidden="true"></i>');
}; // end updateCompleteOnDOM

var validateTaskIn = function() {
  //validate input: return false if empty, else true
  console.log('in validateTaskIn');
  if ($('#taskIn').val() === "") {
    $('#taskIn').addClass('bad-input');
    return false;
  } else {
    return true;
  } // end else
}; // end validateTaskIn
