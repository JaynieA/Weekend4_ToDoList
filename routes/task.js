var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

//var connString = 'postgres://localhost:5432/Weekend4_toDoList';

//get route
router.get('/', function(req, res) {
  console.log('get route hit');
  res.send('GET OK');
}); // end get route

module.exports = router();
