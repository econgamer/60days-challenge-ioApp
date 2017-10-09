
$( document ).ready(function() {
  var $username = $('#username');
  var $userForm = $('#userForm');

  var $pianist = $('#pianist');
  var $drummer = $('#drummer');
  var $dj = $('#dj');

  var $instrument = $('#instrument');
  var $userFormArea = $('#userFormArea');
  var $playArea = $('#playArea');

  var canPlay = false;

  var socket = io.connect();  //youtube - var socket = io.connect()
  var keyCodePressed;

  var myinstrument;


    $('body').bind('keypress', function(e) {
      keyCodePressed = String.fromCharCode(e.keyCode).toLowerCase();


      if(canPlay){
        keyPressHandler(keyCodePressed, myinstrument);
        socket.emit('sendNote', keyCodePressed);
      }

    });


  socket.on('newNote', function(data){


    keyPressHandler(data.note, data.instrument);
  });

  function keyPressHandler(keyCodePressed, instrumentUsed){



    if(instrumentUsed === 'drum'){

      if(keyCodePressed === 'q'){
        var sound = new Howl({
          src: ['drum/hit1.mp3']
        });

        sound.play();

      }

      if(keyCodePressed === 'w'){
        var sound = new Howl({
          src: ['drum/hit2.mp3']
        });

        sound.play();

      }

      if(keyCodePressed === 'e'){
        var sound = new Howl({
          src: ['drum/hit3.mp3']
        });

        sound.play();

      }

      if(keyCodePressed === 'a'){
        var sound = new Howl({
          src: ['drum/hit4.mp3']
        });

        sound.play();

      }
    }

    if(instrumentUsed === 'beep'){


      if(keyCodePressed === 'q'){
        var sound = new Howl({
          src: ['beep/beep1.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 'w'){
        var sound = new Howl({
          src: ['beep/beep7.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 'e'){
        var sound = new Howl({
          src: ['beep/beep13.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 'r'){
        var sound = new Howl({
          src: ['beep/beep14.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 'a'){
        var sound = new Howl({
          src: ['beep/beep15.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 's'){
        var sound = new Howl({
          src: ['beep/beep19.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 'd'){
        var sound = new Howl({
          src: ['beep/beep30.mp3']
        });

        sound.play();
      }
    }


    if(instrumentUsed === 'piano'){


      if(keyCodePressed === 'q'){
        var sound = new Howl({
          src: ['piano/A3.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 'w'){
        var sound = new Howl({
          src: ['piano/B3.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 'e'){
        var sound = new Howl({
          src: ['piano/C3.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 'r'){
        var sound = new Howl({
          src: ['piano/D3.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 'a'){
        var sound = new Howl({
          src: ['piano/E3.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 's'){
        var sound = new Howl({
          src: ['piano/F3.mp3']
        });

        sound.play();
      }

      if(keyCodePressed === 'd'){
        var sound = new Howl({
          src: ['piano/G3.mp3']
        });

        sound.play();
      }
    }



  }


  //userForm submit
  $userForm.submit(function(e){

    myinstrument = $instrument.val();

    e.preventDefault();

    socket.emit('createPlayer', {username: $username.val(), instrument: $instrument.val()}, function(data){

      if(data){
        console.log('Player created');
        $playArea.show();
        $userFormArea.hide();
        canPlay = true;
        //$message.focus();
      }
    });

    $username.val('');

  });

  socket.on('getPlayers', function(data){

    var pianohtml = '';
    var drumhtml = '';
    var beephtml = '';
    // for(i = 0; i < data.musicPlayer.length; i++){
    //   // html += `<li>${data.musicPlayer[i]}</li>` ;
    //   html += `<li>${data.musicPlayer[i]}</li>` ;
    // }


    for(i = 0; i < data.musicPlayer.length; i++){
      // html += `<li>${data.musicPlayer[i]}</li>` ;
      if(data.instrumentPlayerUsed[i] === 'piano'){
        pianohtml += `<li>${data.musicPlayer[i]}</li>` ;
      }else if(data.instrumentPlayerUsed[i] === 'drum'){
        drumhtml += `<li>${data.musicPlayer[i]}</li>` ;
      }else if(data.instrumentPlayerUsed[i] === 'beep'){
        beephtml += `<li>${data.musicPlayer[i]}</li>` ;
      }



    }





    $pianist.html(pianohtml);

    $drummer.html(drumhtml);

    $dj.html(beephtml);


  });


});
