var port = process.env.PORT || 3000;
var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var pg = require( 'pg' );

var connStr = 'postgres://localhost:5432/Weekend4_toDoList';

//middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

//make server listen
app.listen(port, function() {
  console.log('server listening on', port);
}); // end server listen

//routes
var task = require('../routes/task');
app.use('/task', task);
