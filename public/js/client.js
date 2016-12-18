$(document).ready(function() {
  init();
}); // end doc ready

var checkForTasks = function(array) {
  console.log('in checkForTasks');
  //If there are no incomplete tasks, tell user they are all caught up.
  //Else, display tasks
  if (array.length === 0) {
    $('#tasksOut h2').text('You are all caught up!');
    $('#tasksOut').append('<img class="tasks-complete-img" src="images/hero.jpg" alt="You are a hero">');
  } else {
    displayTasks(array);
  } // end else
}; // end checkForTasks

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

var deleteTask = function(object) {
  console.log('in deleteTask');
    $.ajax({
      type: 'DELETE',
      url: '/task',
      data: object,
      success: function(response) {
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

var getConfirmation = function() {
  console.log('in getConfirmation');
  var objectToSend = {
    id: $(this).closest('.task').data('id')
  }; // end objectToSend
  console.log(objectToSend);
  //fade in confirmation popup
  $('.modal').fadeIn();
  //fade out modal if cancel button clicked
  $('.btn-cancel').on('click', function(){
    $('.modal').fadeOut();
  }); // end .btn-cancel click
  //proceed with delete if confirm clicked
  $('.btn-confirm').on('click', function() {
      $('.modal').fadeOut();
      deleteTask(objectToSend);
  }); // end .btn-confirm click
}; // end getConfirmation

var getTasks = function() {
  console.log('in getTasks');
  $.ajax({
    type: 'GET',
    url: '/task',
    success: function(response) {
      console.log('get route success:', response);
      checkForTasks(response.tasks);
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
  $(document).on('click', '.delete-task-btn', getConfirmation);
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
  $completed.find('.complete-task-btn').addClass('disabled');
  $completed.find('.complete-task-btn').html('<i class="fa fa-check-square-o fa-lg" aria-hidden="true"></i>');
  //clone completed task, remove original from DOM, append cloned to bottom of #tasksOut
  $clone_completed = $completed.clone();
  $completed.remove();
  $('#tasksOut').append($clone_completed);
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
