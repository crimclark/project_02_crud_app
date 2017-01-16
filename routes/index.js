var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/crudapp';

router.get('/signup', function(req, res){
  res.render('signup');
});

router.post('/create', function(req, res){
  var id = req.body.username;

  var user = {
    username: req.body.username,
    password: req.body.password
  }

  mongo.connect(url, function(err, db){
    db.collection('users').insertOne(user, function(err, result){
      console.log('user created');
      db.close();
    });
  });

  res.redirect('/home/:id');
});





module.exports = router;
