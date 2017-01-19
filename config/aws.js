var multer = require('multer');
var multerS3 = require('multer-s3');

var aws = require('aws-sdk');
aws.config.update({
  secretAccessKey: process.env.AWS_KEY,
  accessKeyId: process.env.ACCESS_ID,
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

function deleteFromAWS(key) {
  var s3 = new aws.S3();
  var params = {
    Bucket: 'gacrudapp',
    Key: key
  }
  s3.deleteObject(params, function(err, data){
    if (err) console.log(err, err.stack);
    else console.log(data);
  })
}


module.exports = {
  upload: upload,
  delete: deleteFromAWS
}
