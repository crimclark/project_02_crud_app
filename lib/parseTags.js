module.exports = function parseTags(tags){
  if (tags) return tags.split(',');
  return [];
}
