const express = require('express');
const router = express.Router();
const upload = require('../config/aws');
const File = require('../models/File');
const parseTags = require('../lib/parseTags');
const deleteFromAWS = require('../lib/deleteFromAWS');

router.post('/files/:key/delete', function(req, res){
  var key = req.body.key;
  deleteFromAWS(key);
  File.deleteOne({key: key}, (err, file) => {
    res.redirect('/');
  });
});

router.post('/files/:key/update', function(req, res){
  var key = req.body.key;
  var description = req.body.description;
  File.update({key: key}, {$set: {description: description}}, (err, file) => {
    res.json({status: 200});
  })
});

router.post('/upload', upload.array('upl',1), function (req, res, next) {
  var tags = req.body.tags;
  const fileUpload = new File({
    user: req.body.name,
    name: req.files[0].originalname,
    location: req.files[0].location,
    description: req.body.description,
    tags: parseTags(tags),
    type: req.files[0].mimetype,
    key: req.files[0].key
  })
  fileUpload.save( (err, upload) => {
    res.redirect('/');
  });
});

// https://github.com/zishon89us/node-cheat/blob/master/aws/express_multer_s3/app.js

router.get('/tag/:tag', function(req, res){
  var tag = req.params.tag;
  File.find({tags: tag}, (err, files) => {
    if (err) throw err;
    res.render('tagfilter', {files: files, tag: tag});
  });
});

router.get('/users/:user', function(req, res){
  var user = req.params.user;
  File.find({user: user}, (err, files) => {
    if (err) throw err;
    res.render('userfilter', {files: files});
  });
});

router.get('/form', function(req, res){
  res.render('form');
});

router.get('/', (req, res, next) => {
  File.find( (err, files) => {
    if (err) throw err;
    res.render('index', {files: files})
  })
});

router.get('/data', function(req, res){
  res.sendFile('./public/data.html' , { root : './'});
})

router.get('/data.json', (req, res) =>{
  File.find( (err, files) => {
    if (err) throw err;
    res.json(files);
  })
})

module.exports = router;
