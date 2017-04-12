const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const aws = require('../config/aws');

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/crudapp';

const File = require('../models/File');



router.post('/files/:key/delete', function(req, res){
  var key = req.body.key;
  aws.delete(key);
  mongo.connect(url, (err, db) => {
    db.collection('files').deleteOne({key: key}, function(res){
        db.close();
      });
    res.redirect('/');
  });
});

router.post('/files/:key/update', function(req, res){
  var key = req.body.key;
  var description = req.body.description;
  mongo.connect(url, (err, db) => {
    db.collection('files').update({key: key}, {$set: {description: description}});
    db.close();
  });
  res.json({status: 200});
});

function parseTags(tags){
  if (tags) {
    var tagsArr = tags.split(',');
    return tagsArr;
  }
  return;
}

router.post('/upload', aws.upload.array('upl',1), function (req, res, next) {
  var tags = req.body.tags;
  console.log('tags:' + tags);
  var file = {
    user: req.body.name,
    name: req.files[0].originalname,
    location: req.files[0].location,
    description: req.body.description,
    tags: parseTags(tags),
    type: req.files[0].mimetype,
    key: req.files[0].key
  }
  mongo.connect(url, function(err, db){
    db.collection('files').insertOne(file, function(err, result){
      db.close();
      res.redirect('/');
    })
  })
});

// https://github.com/zishon89us/node-cheat/blob/master/aws/express_multer_s3/app.js

router.get('/tag/:tag', function(req, res){
  var tag = req.params.tag;
  mongo.connect(url, function(err, db){
    db.collection('files').find({tags: tag}).toArray(function(err, docs){
      db.close();
      res.render('tagfilter', {files: docs, tag: tag});
    })
  })
});

router.get('/users/:user', function(req, res){
  var user = req.params.user;
  mongo.connect(url, function(err, db){
    db.collection('files').find({user: user}).toArray(function(err, docs){
      db.close();
      res.render('userfilter', {files: docs});
    })
  })
});

router.get('/form', function(req, res){
  res.render('form');
});

router.get('/', function(req, res){
  mongo.connect(url, function(err, db){
    db.collection('files').find().toArray(function(err, docs){
      db.close();
      res.render('index', {files: docs});
    });
  });
});

router.get('/data', function(req, res){
  res.sendFile('./public/data.html' , { root : './'});
})

router.get('/data.json', function(req, res){
  mongo.connect(url, function(err, db){
    db.collection('files').find().toArray(function(err, docs){
      db.close();
      res.json(docs);
    })
  });
})

module.exports = router;
