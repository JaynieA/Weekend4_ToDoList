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
app.get('/task', function(req, res) {
  console.log('get route hit');
  res.send('OK');
}); // end get route

app.post('/task', function(req, res) {
  console.log('post route hit');
  pg.connect(connStr, function(err, client, done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      client.query('INSERT INTO task (name) VALUES ($1);', [req.body.task]);
      //send true as a response
      res.send(true);
    } // end else
  }); // end pg connect
}); // end post route
