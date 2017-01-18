console.log('hello world');

$('.delete').click(function(){
  var id = $(this).parent().attr('id');
  $(this).parent().remove();
  $.post('/files/:id/delete', {key: id}, function(response){
    console.log(response);
  });
});


// $('#signup').click(function(){
//   $.get('/signup', function(data){
//     $('body').html(data);
//   });
// });


// $('#login').click(function(){
//   var id = $('#username').val();
//   $.post('/users/:id', {id: id}, function(data){
//     $('body').html(data);
//   });
// });
