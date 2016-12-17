var port = process.env.PORT || 3000;
var express = require( 'express' );
var app = express();
var path = require( 'path' );
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );

//middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

//make server listen
app.listen(port, function() {
  console.log('server listening on', port);
}); // end server listen
