$( document ).ready(function() {
  var socket = io();  //youtube - var socket = io.connect()
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chat');


  //messageArea, username, userForm, users, userFormArea
  var $messageArea = $('#messageArea');
  var $customerForm = $('#customerForm');
  var $name = $('#name');
  var $phone = $('#phone');
  var $tableNum = $('#tableNum');
  var $time = $('#time');

  var bookingList = [];


  $customerForm.submit(function(e){
    e.preventDefault();
    console.log('submit');

    socket.emit('sendInformation', {
      name: $name.val(),
      phone: $phone.val(),
      tableNum: $tableNum.val(),
      time: $time.val()

    });

    $name.val('');
    $phone.val('');
    $tableNum.val('');
    $time.val('');

  });


  socket.on('getStatus', function(data){
    bookingList = data;

    for(var i = 0; i < bookingList.length; i++){

      if(bookingList[i].tableNum === 12){
        console.log('booked');
        ctx.beginPath();
        ctx.rect(20,20,50,20);
        ctx.fill();
      }
    }


    console.log(bookingList);

  });

  // socket.on('bookStatus', function(data){
  //   $chat.append(`<div class="messageBox">${data.user}: ${data.msg}</div>`);
  // });

  socket.on('bookStatus', function(data){

    bookingList.append(data.tableNum);

    console.log(bookingList);
  });

  // $('#message').keypress(function (e) {
  //   if (e.which == 13) {
  //     $messageForm.submit();
  //     return false;    //<---- Add this line
  //   }
  // });
  //
  //
  //
  //
  //
  //

  //
  //
  // //userForm submit
  // $userForm.submit(function(e){
  //   e.preventDefault();
  //   console.log('Username submit');
  //
  //   socket.emit('createUser', $username.val(), function(data){
  //     console.log('hihi');
  //     if(data){
  //       $messageArea.show();
  //       $userFormArea.hide();
  //       $message.focus();
  //     }
  //   });
  //
  //   $username.val('');
  //
  // });

  socket.on('getUsers', function(data){
    console.log('push user');
    var html = '';
    for(i = 0; i < data.length; i++){
      html += `<li>${data[i]}</li>` ;
    }
    $users.html(html);
  });



  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");

  //table drawing handling




  //table1
  ctx.beginPath();
  ctx.rect(20,20,50,20);
  ctx.stroke();
  



  //table2
  ctx.beginPath();
  ctx.rect(100,20, 50,20);
  ctx.stroke();

  //table3
  ctx.beginPath();
  ctx.rect(180,20, 50,20);
  ctx.stroke();

  //table4
  ctx.beginPath();
  ctx.rect(260,20, 50,20);
  ctx.stroke();

});
