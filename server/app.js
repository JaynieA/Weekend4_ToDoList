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

//routes
app.get('/get', function(req, res) {
  console.log('get route hit');
  res.send('GET OK');
}); // end get route

app.post('/post', function(req, res) {
  console.log('post route hit');
  res.send(req.body.thing);
}); // end post route
