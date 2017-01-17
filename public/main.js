console.log('hello world');



$('#signup').click(function(){
  $.get('/signup', function(data){
    $('body').html(data);
  });
});


$('#login').click(function(){
  var id = $('#username').val();
  $.post('/users/:id', {id: id}, function(data){
    $('body').html(data);
  });
});
