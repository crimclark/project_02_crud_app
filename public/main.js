console.log('hello world');
// $(".button-collapse").sideNav();
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
    // console.log(id);
    $(this).attr('contenteditable', 'false');
    $.post('/files/:key/update', {description: description, key: id}, function(res){
      // console.log(res);
    })
  }
});

// $.get('/', function(res){
//   $('body').append(res.message);
//   // console.log(res);
// });

$('#tags-input').keydown(function(event){
  var tagsInput = $('#tags-input');
  var tags = $('#tags');
  if (event.keyCode === 13) {
    // console.log('pressed enter');
    tags.val(tags.val() + '#' + tagsInput.val() + ' ');
    tagsInput.val('');
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
      tag: 'Apple',
    }, {
      tag: 'Microsoft',
    }, {
      tag: 'Google',
    }],
  });
$('.chips-placeholder').material_chip({
  placeholder: 'Enter a tag',
  secondaryPlaceholder: '+Tag',
});

$('#data-btn').on('click', function(evt){
  $.get('/data', function(res){
    // console.log(res);
  })
});

$('#upl-form').on('submit', function(evt) {
  var chips = $('.chips').material_chip('data');
  var tags = $('.chips').material_chip('data').map(function(obj) { return obj.tag }).join(',');
  $('#hiddenfield').val(tags);
})




