var express = require( 'express' );
var router = express.Router();
var path = require( 'path' );
var pg = require( 'pg' );

var connStr = process.env.DATABASE_URL || 'postgres://localhost:5432/Weekend4_toDoList';

//get route
//gets list for select
router.get('/', function(req, res) {
  var lists = [];
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      //if there is an error, log it
      console.log('error:', err);
    } else {
      var query = client.query('SELECT id, name FROM list ORDER BY name');
      query.on('row', function(row){
        lists.push(row);
      }); // end query
      query.on('end', function() {
        //disconnect from database, send tasks to client
        done();
        res.send({lists: lists});
      }); // end query
    } // end else
  }); // end pg connect
}); // end get route

//post route: adds new list
router.post('/', function(req, res) {
  console.log('post route hit- list');
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      client.query('INSERT INTO list (name) VALUES ($1);', [req.body.name]);
      done();
      //send true as a response
      res.send(true);
    } // end else
  }); // end pg connect
}); // end post route

module.exports = router;
