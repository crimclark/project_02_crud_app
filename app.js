var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

var port = 3000;
app.listen(port, function(){
  console.log('listening on port ' + port);
})
