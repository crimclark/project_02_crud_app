var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/crudapp';

var multer = require('multer');
var multerS3 = require('multer-s3');

var aws = require('aws-sdk');
aws.config.update({
  secretAccessKey: 'OSf2QS5mePwtzUzBFG+9/Pat56ON5kSIJjaf66kV',
  accessKeyId: 'AKIAJP64EUGYNTXP32CQ',
  region: 'us-east-1'
});

var s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        bucket: 'gacrudapp',
        key: function (req, file, cb) {
            // console.log(file);
            cb(null, Date.now().toString()); //use Date.now() for unique file keys
        }
    })
});

function deleteFile() {
  var params = {
    Bucket: 'gacrudapp',
    Key: 'filename'
  }
  s3.deleteObject(params, function(err, data){
    if(data) {
      console.log("file deleted successfuly");
    } else {
      console.log("error");
    }
  })
}

router.post('/files/:id/delete', function(req, res){
  var id = objectId(req.body.id);
  mongo.connect(url, (err, db) => {
    db.collection('files').deleteOne({_id: id}, function(res){
      db.close();
    });
    res.json({status:200});
  });
});

// router.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

router.post('/upload', upload.array('upl',1), function (req, res, next) {
  var file = {
    user: req.body.name,
    name: req.files[0].originalname,
    location: req.files[0].location
  }
  mongo.connect(url, function(err, db){
    db.collection('files').insertOne(file, function(err, result){
      db.close();
      res.redirect('/');
    })
  })
    // var filename = req.files[0].originalname;
    // var fileLocation = req.files[0].location;
    // console.log(req.files);
    // res.send('Successfully uploaded ' + '<a href=\"' + fileLocation + '\">' + filename + '</a>');
});

// https://github.com/zishon89us/node-cheat/blob/master/aws/express_multer_s3/app.js

router.get('/', function(req, res){
  mongo.connect(url, function(err, db){
    db.collection('files').find().toArray(function(err, docs){
      // console.log(docs);
      db.close();
      res.render('home', {files: docs});
    })
  })
})

// router.get('/', function(req, res){
//   res.render('home');
// })


module.exports = router;
