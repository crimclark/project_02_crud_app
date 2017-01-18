var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');


var routes = require('./routes/index');

var app = express();


app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.set('view engine', 'ejs');



var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on port ' + port);
})
