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
  var $tableType = $('#tableType');


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

    // for(var i = 0; i < bookingList.length; i++){
    //
    //   if(bookingList[i].tableNum === 12){
    //     console.log('booked');
    //
    //   }
    // }


    console.log(bookingList);

  });

  // socket.on('bookStatus', function(data){
  //   $chat.append(`<div class="messageBox">${data.user}: ${data.msg}</div>`);
  // });

  socket.on('bookStatus', function(data){

    // bookingList.push(data);
    //
    // console.log(bookingList);
  });


  socket.on('getUsers', function(data){
    console.log('push user');
    var html = '';
    for(i = 0; i < data.length; i++){
      html += `<li>${data[i]}</li>` ;
    }
    $users.html(html);
  });



  // var c=document.getElementById("myCanvas");
  // var ctx=c.getContext("2d");

  //table drawing handling

  var elem = document.getElementById('myCanvas'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    context = elem.getContext('2d'),
    elements = [];


    //text elements
    context.font = "30px Arial";
    context.fillText("Kitchen",100,200);

    context.font = "10px Arial";
    context.fillText("Entrance",400,450);

    context.font = "20px Arial";
    context.fillText("Performance",350,250);

    context.font = "20px Arial";
    context.fillText("Area",350,275);


// Add event listener for `click` events.
elem.addEventListener('click', function(event) {

  console.log('Book List after click: ' , bookingList);

    $time.html('');
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    console.log(x, y);
    elements.forEach(function(element) {
        if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
            $tableNum.val(element.name);

            $tableType.html(`Up to ${element.type} people`);

            var availableTime = ['12', '14', '18', '20'];

            var tableNumberSelected = element.name;


            for(var t = 0; t < bookingList.length; t++){
              console.log('bookingList.length: ', bookingList.length);

              if(bookingList[t].tableNum == tableNumberSelected.toString()){
                console.log('The table has been booked at ' + bookingList[t].time);


                var i = availableTime.indexOf(bookingList[t].time);



                if(i != -1) {
                	availableTime.splice(i, 1);
                  console.log('availableTime after splice', availableTime);
                }
              }
            }




            for(var len = 0; len < availableTime.length; len++){
              console.log(availableTime);

              $time.append(`<option value='${availableTime[len]}'>${availableTime[len]} : 00</option>`);
            }



            console.log(availableTime);



        }
    });

}, false);

// Add element.
elements.push(
  {
    name: 1,
    type: 'two',
    colour: '#00c10c',
    width: 20,
    height: 40,
    top: 20,
    left: 15
},{
  name: 2,
  type: 'two',
  colour: '#00c10c',
  width: 20,
  height: 40,
  top: 20,
  left: 75
},{
  name: 3,
  type: 'two',
  colour: '#00c10c',
  width: 20,
  height: 40,
  top: 20,
  left: 135
},{
  name: 4,
  type: 'two',
  colour: '#00c10c',
  width: 20,
  height: 40,
  top: 20,
  left: 195
}, {
  name: 5,
  type: 'two',
  colour: '#00c10c',
  width: 20,
  height: 40,
  top: 20,
  left: 255
}, {
  name: 6,
  type: 'four',
  colour: '#00c10c',
  width: 40,
  height: 80,
  top: 100,
  left: 255
}, {
  name: 7,
  type: 'four',
  colour: '#00c10c',
  width: 40,
  height: 80,
  top: 200,
  left: 255
}, {
  name: 8,
  type: 'four',
  colour: '#00c10c',
  width: 40,
  height: 80,
  top: 300,
  left: 255
}


);

// Render elements.
elements.forEach(function(element) {
    context.fillStyle = element.colour;
    context.fillRect(element.left, element.top, element.width, element.height);
});


  //
  // //table1
  // ctx.beginPath();
  // ctx.rect(20,20,50,20);
  // ctx.stroke();
  //
  //
  //
  //
  // //table2
  // ctx.beginPath();
  // ctx.rect(100,20, 50,20);
  // ctx.stroke();
  //
  // //table3
  // ctx.beginPath();
  // ctx.rect(180,20, 50,20);
  // ctx.stroke();
  //
  // //table4
  // ctx.beginPath();
  // ctx.rect(260,20, 50,20);
  // ctx.stroke();

});
