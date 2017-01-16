var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/crudapp';

router.get('/', function(req, res){
  res.send('test');
});

module.exports = router;
