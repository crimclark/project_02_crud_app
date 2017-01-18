console.log('hello world');

$('.delete').click(function(){
  var id = $(this).parent().attr('id');
  $.post('/files/:id/delete', {id: id}, function(response){
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
