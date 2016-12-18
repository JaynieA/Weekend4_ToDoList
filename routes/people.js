var express = require( 'express' );
var router = express.Router();
var path = require( 'path' );
var pg = require( 'pg' );

var connStr = 'postgres://localhost:5432/Weekend4_toDoList';

//get route
router.get('/', function(req, res) {
  console.log('get route hit');
  var people = [];
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      //if there is an error, log it
      console.log('error:', err);
    } else {
      var query = client.query('SELECT id, first_name, last_name FROM people ORDER BY last_name, first_name');
      query.on('row', function(row){
        people.push(row);
      }); // end query
      query.on('end', function() {
        //disconnect from database, send tasks to client
        done();
        res.send({people: people});
      }); // end query
    } // end else
  }); // end pg connect
}); // end get route

module.exports = router;
