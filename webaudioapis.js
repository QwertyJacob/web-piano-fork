var c = new AudioContext();
var comp = c.createDynamicsCompressor();
var attack = 0.1;
var release = 0.1;
var gains = [];
var oscillators = [];
keys = "awsedftgyhujk";


comp.connect(c.destination);



function noteOn(freq) {
    var o = c.createOscillator();
    var g = c.createGain();
    gains[freq] = g;
    oscillators[freq] = o;
    o.connect(g);
    o.start();
    g.connect(comp);
    o.frequency.setValueAtTime(freq, c.currentTime);
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(1, c.currentTime + attack);
}

/*
* This function is going to turn off the sound
* */
function noteOff(freq) {
    var g = gains[freq]
    var o = oscillators[freq];
    g.gain.exponentialRampToValueAtTime(0.1, c.currentTime + release);
    o.stop(c.currentTime + release);
}

function noteToFreq(note) {return 440*Math.pow(2,note/12)}



document.body.onkeydown = function (e) {
    if (!e.repeat) {

        let index_of_key = keys.indexOf(e.key)

        let computed_frequency = noteToFreq(index_of_key)

        noteOn(computed_frequency)

    }

}


document.body.onkeyup = function(e) {noteOff(noteToFreq(keys.indexOf(e.key)))}
