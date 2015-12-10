(function() {
    var context,
        soundSource,
        soundBuffer,
        url = './audio/Mable.mp3';

    // Step 1 - Initialise the Audio Context
    // There can be only one!
    function init() {
        if (typeof AudioContext !== "undefined") {
            context = new AudioContext();
        } else if (typeof webkitAudioContext !== "undefined") {
            context = new webkitAudioContext();
        } else {
            throw new Error('AudioContext not supported. :(');
        }
    }

    // Step 2: Load our Sound using XHR
    function startSound() {
        // Note: this loads asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        // Our asynchronous callback
        request.onload = function() {
            var audioData = request.response;

            audioGraph(audioData);


        };

        request.send();
    }

    // Finally: tell the source when to start
    function playSound() {
        // play the source now
        soundSource.start(context.currentTime);
    }

    function stopSound() {
        // stop the source now
        soundSource.stop(context.currentTime);
    }

    // Events for the play/stop bottons
    document.querySelector('.fa-play').addEventListener('click', startSound);
    document.querySelector('.fa-stop').addEventListener('click', stopSound);


    // This is the code we are interested in
    function audioGraph(audioData) {
        // create a sound source
        soundSource = context.createBufferSource();

        // The Audio Context handles creating source buffers from raw binary
        context.decodeAudioData(audioData, function(soundBuffer){
            // Add the buffered data to our object
            soundSource.buffer = soundBuffer;

            // Plug the cable from one thing to the other
            soundSource.connect(context.destination);

            // Finally
            playSound(soundSource);
        });
    }
    init();
}());
