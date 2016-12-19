var express = require( 'express' );
var router = express.Router();
var path = require( 'path' );
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var connStr = process.env.DATABASE_URL || 'postgres://localhost:5432/Weekend4_toDoList';

//gets people for tasks
router.get('/', function(req, res) {
  peopleAndTasks = [];
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      //if there is an error, log it
      console.log('error:', err);
    } else {
      var query = client.query("SELECT people.first_name, people.last_name, people_task.task_id, people_task.people_id  FROM people JOIN people_task ON people.id = people_task.people_id JOIN task ON task.id = people_task.task_id");
      query.on('row', function(row){
        peopleAndTasks.push(row);
      }); // end query
      query.on('end', function() {
        //disconnect from database, send tasks to client
        done();
        res.send({peopleAndTasks: peopleAndTasks});
      }); // end query
    } // end else
  }); // end pg connect
}); // end get route


//gets list for tasks
router.get('/whichList', function(req, res) {
  listForTasks = [];
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      //if there is an error, log it
      console.log('error:', err);
    } else {
      var query = client.query("SELECT task.id AS task_id, task.list_id, list.name AS list_name FROM task JOIN list ON task.list_id = list.id");
      query.on('row', function(row){
        listForTasks.push(row);
      }); // end query
      query.on('end', function() {
        //disconnect from database, send tasks to client
        done();
        res.send({listForTasks: listForTasks});
      }); // end query
    } // end else
  }); // end pg connect
}); // end get route

module.exports = router;
