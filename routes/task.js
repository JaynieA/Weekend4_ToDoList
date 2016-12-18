var express = require( 'express' );
var router = express.Router();
var path = require( 'path' );
var pg = require( 'pg' );

var connStr = 'postgres://localhost:5432/Weekend4_toDoList';

//get route
router.get('/', function(req, res) {
  console.log('get route hit');
  var tasks = [];
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      //if there is an error, log it
      console.log('error:', err);
    } else {
      var query = client.query('SELECT id, name FROM task WHERE completed = FALSE ORDER BY id ASC');
      query.on('row', function(row){
        tasks.push(row);
      }); // end query
      query.on('end', function() {
        //disconnect from database, send tasks to client
        done();
        res.send({tasks: tasks});
      }); // end query
    } // end else
  }); // end pg connect
}); // end get route

//post route
router.post('/', function(req, res) {
  console.log('post route hit');
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      client.query('INSERT INTO task (name) VALUES ($1);', [req.body.task]);
      done();
      //send true as a response
      res.send(true);
    } // end else
  }); // end pg connect
}); // end post route

//put route
router.put('/', function(req, res) {
  console.log('put route hit, request:', req.body.id);
  pg.connect(connStr, function(err, client, done){
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
        console.log('connected to db on put route');
        client.query('UPDATE task SET completed = TRUE WHERE id = $1', [req.body.id]);
        done();
        res.send(req.body.id);
    } // end else
  }); // end pg connect
}); // end put route

//delete route
router.delete('/', function(req, res) {
  console.log('delete route hit', req.body.id);
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      console.log('connected to db on delete route');
      client.query('DELETE FROM task WHERE id = $1', [req.body.id]);
      done();
      res.send(req.body.id);
    } // end else
  }); // end pg connect
}); // end delete route

module.exports = router;
