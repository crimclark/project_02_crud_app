$('.modal').modal();

$('.delete').click(function(){
  var post = $(this).closest('.posts');
  var id = $(this).closest('.posts').attr('id');
  post.remove();
  $.post('/files/:key/delete', {key: id}, function(response){
    // console.log(response);
  });
});

$('.description').click(function(){
  $(this).attr('contenteditable', 'true');
});

$('.description').keydown(function(event){
  var description = $(this).text();
  if (event.keyCode === 13) {
    var id = $(this).closest('.posts').attr('id');
    $(this).attr('contenteditable', 'false');
    $.post('/files/:key/update', {description: description, key: id}, function(res){
      // console.log(res);
    })
  }
});

$(document).on("keypress", ":input:not(textarea)", function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});

$('.chips').material_chip();

$('.chips-initial').material_chip({
  data: [{
    tag: 'tag'
  }]
});

$('.chips-placeholder').material_chip({
  placeholder: 'Enter a tag',
  secondaryPlaceholder: '+Tag',
});

$('#data-btn').on('click', function(evt){
  $.get('/data', function(res){
  })
});

$('#upl-form').on('submit', function(evt) {
  var chips = $('.chips').material_chip('data');
  var tags = $('.chips').material_chip('data').map(function(obj) { return obj.tag }).join(',');
  console.log($('#hiddenfield').val(tags));
  $('#hiddenfield').val(tags);
})




