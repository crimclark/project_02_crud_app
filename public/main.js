console.log('hello world');

$('#delete').click(function(){
  var id = $(this).parent().attr('id');
  $(this).parent().remove();
  $.post('/files/:id/delete', {key: id}, function(response){
    console.log(response);
  });
});

$('.description').click(function(){
  $(this).attr('contenteditable', 'true');
});

$('.description').keydown(function(event){
  if (event.keyCode === 13) {
    $(this).attr('contenteditable', 'false');

  }
})
