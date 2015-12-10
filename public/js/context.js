'use strict';

var mable = null;

var context;

window.addEventListener('load', init, false);

function init() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
    }
  }

  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}
