var c = new AudioContext();
var comp = c.createDynamicsCompressor();
comp.connect(c.destination);

var attack = 0.1;
var release = 0.1;
var gains = [];
var oscillators = [];

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

function noteOff(freq) {
    var g = gains[freq]
    var o = oscillators[freq];
    g.gain.exponentialRampToValueAtTime(0.1, c.currentTime + release);
    //o.stop(c.currentTime + release);
}

const keys = "awsedftgyhujk";

function noteToFreq(note) {return 440*Math.pow(2,note/12)}

document.body.onkeydown = function (e) {if (!e.repeat) noteOn(noteToFreq(keys.indexOf(e.key)))}
document.body.onkeyup = function(e) {noteOff(noteToFreq(keys.indexOf(e.key)))}