#Weekend Challenge 4: The To Do List

##Technologies:
* JavaScript
* jQuery
* Express.js
* Node.js
* SASS
* HTML5
* PosgreSQL

-----

This weekend is all about showing us that you have a handle on each of the different parts of the full stack. For this weekends challenge, you are going to create a 'TO DO' application. This is the type of application that is very common to tackle when learning a new language, which makes it extremely valuable to work through for the first time, since chances are good that at some point in your career you will tackle this type of application, but in another language.

Here are the specific components for the challenge:

* [x] Create a front end experience that allows a user to create a task.
* [x] When the task is created, it should be stored inside of a database (SQL)
* [x] Whenever a task is created the front end should refresh to show all tasks that need to be completed.
* [x] Each task should have an option to 'Complete' or 'Delete'.
* [x] When a task is complete, its visual representation should change on the front end (for example, the background of the task container could change from gray to green, as well as the complete option 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete)
* [x] Whether or not a task is complete should also be stored in the database.
* [x] Deleting a task should remove it both from the Front End as well as the Database.

* [x] Make sure that you also show us your best styling chops. We encourage you to try and write pure CSS rather than use Bootstrap.

We would recommend you spend some time thinking about how to approach this problem. Think through all the logic that will be needed prior to writing any code. Take your time, relax, remember that impostor syndrome is real, and that you are capable of knocking this out of the park!

* [x] Additionally, please include some way to recreate your initial database schema. This can be a .sql file with `CREATE TABLE` statements or you can create your schema automatically when your app loads.

###HARD MODE
* [x] In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task. Once again, you can interrupt this however you would like.

###PRO MODE
* [] Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.

###SUPER PRO MODE
* [] Adjust the logic, app performance, and database schema to match that of the following ERD:
![ERD](public/images/super-pro-mode-ERD-model.png?raw=true "ERD")

###STRETCH GOALS
* [] Add server-side validation
* [] Host app on Heroku
