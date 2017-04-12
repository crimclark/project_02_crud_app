const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  user: String,
  name: String,
  location: String,
  description: String,
  tags: [],
  type: String,
  key: String
});

const File = mongoose.model('File', FileSchema);

module.exports = File;
