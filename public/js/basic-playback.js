'use strict';

(function() {
  var context,
    soundSource,
    soundBuffer,
    url = './audio/Mable.mp3';

  // initialize AudioContext
  function init() {
    try {
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
  }

  // load sound with XMLHttpRequest
  function loadSound() {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      var audioData = request.response;

      audioGraph(audioData);
    }

    request.send();
  }

  // play & stop functions
  function playSound() {
    soundSource.start(context.currentTime);
  }

  function stopSound() {
    soundSource.stop(context.currentTime);
  }

  document.querySelector('.fa-play').addEventListener('click', loadSound);
  document.querySelector('.fa-stop').addEventListener('click', stopSound);

  function audioGraph(audioData) {

    // create a sound source
    soundSource = context.createBufferSource();

    // audio context handles creating buffers from binary
    context.decodeAudioData(audioData, function(soundBuffer) {

      // add buffered data to object
      soundSource.buffer = soundBuffer;

      // send source to speakers
      soundSource.connect(context.destination);

      //play
      playSound(soundSource);
    })
  }

  init(); // call init
}());
