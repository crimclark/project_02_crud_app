var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
// var passport = require('passport');
// var localStrategy = require('passport-local').Strategy;

// app.use(passport.initialize());
// app.use(passport.session());


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

  res.redirect('/users/' + req.body.username);
});

router.get('/users/:id', function(req, res){
  res.send('Welcome ' + req.params.id);
});

router.post('/users/:id', function(req, res){
  res.send('Welcome ' + req.body.id);
});

// router.post('/create', function(req, res){
//   passport.authenticate('local', {
//     successRedirect: '/loginSuccess',
//     failureRedirect: '/loginFailure'
//   })
// });

// router.get('/loginsuccess', function(req, res){
//   res.send('failed to authenticate');
// });

// router.get('/loginSuccess', function(req, res){
//   res.send('successfully authenticated');
// })

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

// passport.use(new LocalStrategy(function(username, password, done){
//   process.nextTick(function(){
//     //auth check logic
//   });
// }));




module.exports = router;
