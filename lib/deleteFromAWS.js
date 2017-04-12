const aws = require('aws-sdk');

const deleteFromAWS = key => {
  const s3 = new aws.S3();
  const params = {
    Bucket: 'gacrudapp',
    Key: key
  }
  s3.deleteObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  })
};

module.exports = deleteFromAWS;
