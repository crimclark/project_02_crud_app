console.log('hello world');

$('#signup').click(function(){
  $.get('/signup', function(data){
    $('body').html(data);
  });
});
