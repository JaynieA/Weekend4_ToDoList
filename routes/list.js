var express = require( 'express' );
var router = express.Router();
var path = require( 'path' );
var pg = require( 'pg' );

var connStr = process.env.DATABASE_URL || 'postgres://localhost:5432/Weekend4_toDoList';

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
