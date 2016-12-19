$(document).ready(function() {
  init();
}); // end doc ready

var addPeopleSelect = function(){
  console.log('in addpeopleSelect');
  $('.select-group').append('<select class="people-select"></select>');
  var $newSelect = $('.select-group').children().last();
  $newSelect.append('<option value="" selected disabled>Choose a Person:</option>');
  $('.select-group').append('<button type="button"></button>');
  var $newButton = $('.select-group').children().last();
  $newButton.addClass('btn btn-xs btn-delete-select');
  $newButton.append('<i class="fa fa-times" aria-hidden="true"></i>');
  getAllPeople();
  controlAssignButtonVisibility();
}; // end addpeopleSelect

var checkForTasks = function(array) {
  console.log('in checkForTasks');
  //If there are no incomplete tasks, tell user they are all caught up.
  //Else, display tasks
  if (array.length === 0) {
    $('#tasksOut h2').text('You are all caught up!');
    $('#tasksOut').append('<img src="images/hero.jpg" alt="You are a hero">');
    var $img = $('#tasksOut').children().last();
    $img.addClass('tasks-complete-img');
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

var controlAssignButtonVisibility = function(){
  console.log('in controlAssignButtonVisibility');
  //get number of selects on dom after adding
  var numSelects = $('.people-select').length;
  //get number people by counting the number of options in the first select
  var numOptions = $('.select-group').children().first().find('option').length - 1;
  //If Number of Selects is >= Number of people, hide 'Assign to More' button
  if (numSelects >= numOptions) {
    $('.btn-add-people-selects').hide();
    $('#addTaskButton').css('margin-left','10px');
  } else if (numSelects < numOptions) {
    $('.btn-add-people-selects').show();
    $('#addTaskButton').css('margin-left','5px');
  } // end else/if
}; // end controlAssignButtonVisibility

var createTask = function(e){
  e.preventDefault();
  console.log('in createTask');
  $('.people-select').removeClass('bad-input');
  var people = [];
  //if validatePeopleAssigned returns true, continue
  if (validatePeopleAssigned()) {
    //get values of all selected names
    $('.people-select').each(function() {
      var person = $(this).val();
      //split string to get id number from beginning of value
      console.log('person is not null');
      var result = person.split("-")[0];
      //push result into people array
      people.push(result);
    }); // end each select
    console.log('people array:',people);
    if (validateTaskIn()){
      var objectToSend = {
        task: $('#taskIn').val(),
        people: people
      }; // end objectToSend
      console.log(objectToSend);
      //post task to server for insertion into database
      postTask(objectToSend);
    } // end if
    //clear input value
    $('#taskIn').val('');
  } // end if
}; // end createTask

var deletePeopleSelect = function(){
  console.log('in deletePeopleSelect');
  //remove the closest select
  $(this).prev().remove();
  //remove the button itself
  $(this).remove();
  controlAssignButtonVisibility();
}; // end deletePeopleSelect

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

var disableSelectedPeople = function(){
  console.log('in disableSelectedPeople');
  var numSelects = $('.people-select').length;
  //if more than one select, continue
  if (numSelects > 1) {
    var $lastSelectCreated = $('.select-group .people-select:last');
    var selectedValues = [];
    //get values of all selected names and push into array
    $('select.people-select').each(function() {
      selectedValues.push($(this).val());
    }); // end each select
    //disable all options on most recently added select with values matching those in array
    $(".people-select:last option").each(function() {
      var $thisOption = $(this);
      for (var i = 0; i < selectedValues.length; i++) {
        var valueToCompare = selectedValues[i];
        if($thisOption.val() == valueToCompare) {
            $thisOption.attr("disabled", "disabled");
        } // end if
      } // end for
    }); // end each
  } // end if
}; // end disableSelectedPeople

var displayPeopleOnSelects = function(array){
  console.log('in displayPeopleOnSelects');
  //populate last people-select with options
  for (var i = 0; i < array.length; i++) {
    var id = array[i].id;
    var first_name = array[i].first_name;
    var last_name = array[i].last_name;
    $('.people-select').last().append('<option value="'+ id +'-person">'+ first_name + ' ' + last_name + '</option>');
  } // end for
}; // end displayPeopleOnSelects

var displayTaskAssignments = function(array){
  console.log('in displayTaskAssignments');
  for (var i = 0; i < array.length; i++) {
    //find task div's that match using data attribute
    var $taskMatch = $("#tasksOut").find("[data-id='" + array[i].task_id + "']").find('.task-people');
    //add names of those assigned to .task-people paragraph
    var outputText = $taskMatch.html();
    //add formatting if more than one person added
    if (outputText !== '') {
      outputText += ', ';
    } // end if
    outputText += array[i].first_name + ' ' + array[i].last_name;
    $taskMatch.html(outputText);
  } // end for
}; // end displayTaskAssignments

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
    //append people assigned to the task:
    $taskDiv.append('<p class="task-people"></p>');
  } // end for
}; // end displayTasks

var getConfirmation = function() {
  console.log('in getConfirmation');
  var objectToSend = {
    id: $(this).closest('.task').data('id')
  }; // end objectToSend
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

var getAllPeople = function() {
  console.log('in getAllPeople');
  $.ajax({
    type: 'GET',
    url: '/people',
    success: function(response) {
      displayPeopleOnSelects(response.people);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getAllPeople

var getPeopleForTasks = function(){
  console.log('in getPeopleForTasks');
  $.ajax({
    type: 'GET',
    url: '/joined',
    success: function(response) {
      displayTaskAssignments(response.peopleAndTasks);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getPeopleForTasks

var getTasks = function() {
  console.log('in getTasks');
  $.ajax({
    type: 'GET',
    url: '/task',
    success: function(response) {
      console.log('get route success:', response);
      checkForTasks(response.tasks);
      getPeopleForTasks();
    }, // end success
    error: function(err) {
      console.log('get route error:', err);
    } // end error
  }); // end ajax
}; // end getTasks

var init = function() {
  console.log('in init');
  getTasks();
  // getPeopleForTasks();
  getAllPeople();
  //event listeners
  $(document).on('click', '.complete-task-btn', completeTask);
  $(document).on('click', '.delete-task-btn', getConfirmation);
  $(document).on('click', '.btn-add-people-selects', addPeopleSelect);
  $(document).on('click', '.btn-delete-select', deletePeopleSelect);
  $(document).on('mouseover', '.people-select', disableSelectedPeople);
}; // end init

var postTask = function(object) {
  console.log('in postTask');
  $.ajax({
    type: 'POST',
    url: '/task',
    data: JSON.stringify(object),
    contentType: 'application/json',
    success: function(response) {
      resetAddTaskForm();
      //get and display new tasks
      getTasks();
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end postTask

var resetAddTaskForm = function() {
  console.log('in resetAddTaskForm');
  //reset bad input appearances
  $('#taskIn').removeClass('bad-input');
  $('.people-select').removeClass('bad-input');
  $('.people-select').prop('selectedIndex',0);
  //reset number of selects to one
  console.log($('.people-select').length);
  if ($('.people-select').length > 1) {
    $('.people-select:last').remove();
  } // end if
}; // end resetAddTaskForm

var updateCompletedAppearance = function(num) {
  console.log('in updateCompleteOnDOM:');
  //select div of completed task using data attribute
  var $completed = $('#tasksOut').find("[data-id='" + num + "']");
  //change completed button to checked icon
  $completed.find('.complete-task-btn').addClass('disabled');
  $completed.find('.complete-task-btn').html('<i class="fa fa-check-square-o fa-lg" aria-hidden="true"></i>');
  //clone completed task
  $clone_completed = $completed.clone();
  //fadeOut completed task
  $completed.fadeOut('slow', function(){
    //remove completed from DOM, append and fadeIn cloned to bottom of list
    $completed.remove();
    $clone_completed.hide().appendTo("#tasksOut").fadeIn('slow');
  }); // end fadeOut
}; // end updateCompleteOnDOM

var validatePeopleAssigned = function() {
  console.log('in validatePeopleAssigned');
  var toValidate = [];
  //get values of all selects, push into toValidate
  $('.people-select').each(function() {
    var person = $(this).val();
    toValidate.push(person);
  }); // end each select
  //check if null exists within toValidate
  if (toValidate.indexOf(null) === -1){
    return true;
  } else {
    //Turn select with value null red so user knows what's up
    $('.people-select').each(function() {
      console.log($(this).val());
      if ($(this).val() === null) {
        $(this).addClass('bad-input');
      } // end if
    }); // end each select
    return false;
  } // end else
}; // end validatePeopleAssigned

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
