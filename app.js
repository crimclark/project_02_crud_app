var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
var routes = require('./routes/index');

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));





app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// app.set('view engine', 'ejs');


var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on port ' + port);
})
