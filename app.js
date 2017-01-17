var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var multer = require('multer'),
// var multerS3 = require('multer-s3');
// var aws = require('aws-sdk');

// var multer  = require('multer');

// aws.config.update({
//   secretAccessKey: 'OSf2QS5mePwtzUzBFG+9/Pat56ON5kSIJjaf66kV',
//   accessKeyId: 'AKIAJP64EUGYNTXP32CQ',
//   region: 'us-east-1'
// });
// var s3 = new aws.S3();


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
