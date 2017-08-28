$( document ).ready(function() {
  var socket = io();  //youtube - var socket = io.connect()
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chat');


  //messageArea, username, userForm, users, userFormArea
  var $messageArea = $('#messageArea');
  var $username = $('#username');
  var $userForm = $('#userForm');
  var $users = $('#users');
  var $userFormArea = $('#userFormArea');


  $messageForm.submit(function(e){
    e.preventDefault();
    console.log('submit');

    socket.emit('sendMessage', $message.val());
    $message.val('');

  });


  $('#message').keypress(function (e) {
    if (e.which == 13) {
      $messageForm.submit();
      return false;    //<---- Add this line
    }
  });






  socket.on('newMessage', function(data){
    $chat.append(`<div class="messageBox">${data.user}: ${data.msg}</div>`);
  });


  //userForm submit
  $userForm.submit(function(e){
    e.preventDefault();
    console.log('Username submit');

    socket.emit('createUser', $username.val(), function(data){
      console.log('hihi');
      if(data){
        $messageArea.show();
        $userFormArea.hide();
        $message.focus();
      }
    });

    $username.val('');

  });

  socket.on('getUsers', function(data){
    console.log('push user');
    var html = '';
    for(i = 0; i < data.length; i++){
      html += `<li>${data[i]}</li>` ;
    }
    $users.html(html);
  });


});
