var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var passport = require('passport');
// var localStrategy = require('passport-local').Strategy;

// app.use(passport.initialize());
// app.use(passport.session());

var routes = require('./routes/index');

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);


var port = 3000;
app.listen(port, function(){
  console.log('listening on port ' + port);
})
