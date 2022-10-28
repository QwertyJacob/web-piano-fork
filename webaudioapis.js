let c = new AudioContext();
let comp = c.createDynamicsCompressor();
let attack = 0;
let release = 0.1;
let gains = [];
let oscillators = [];
let hardcoded_frequencies = [523.25, 554.37,  587.33, 622.25,  659.25,  698.46,  739.99,  783.99,  830.61,  880.00,  932.33,  987.77, 1046.50, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760.00, 1864.66, 1975.53]
let key_labels = ['C1', 'Db1', 'D1', 'Eb1', 'E1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1', 'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2']
let exercise_keys = "awsedftgyhujk";


comp.connect(c.destination);

let current_canvas;
let current_key_context;
let current_id;
for (let i = 0; i < hardcoded_frequencies.length; i++) {
    current_id = key_labels[i]+'_label'
    current_canvas = document.getElementById(current_id)
    current_key_context = current_canvas.getContext("2d");
    current_key_context.font = "30px Arial";
    current_key_context.strokeText(key_labels[i],10,50)
}


function noteOnOffMouse(freq) {
    let o = c.createOscillator();
    let g = c.createGain();
    gains[freq] = g;
    oscillators[freq] = o;
    o.connect(g);
    o.start();
    g.connect(comp);
    o.frequency.setValueAtTime(freq, c.currentTime);
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(1, c.currentTime + attack);


    g.gain.linearRampToValueAtTime(0.1, c.currentTime + release);
    o.stop(c.currentTime + release);
}
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
        let index_of_note = exercise_keys.indexOf(e.key)
        //let index_of_key = keys.indexOf(e.key)
        let computed_frequency = noteToFreq(index_of_note)
        console.log(computed_frequency)
        noteOn(computed_frequency)

    }

}


document.body.onkeyup = function(e) {
  let index_of_note = exercise_keys.indexOf(e.key)
  //let referenced_frequency =  hardcoded_frequencies[index_of_note]
  let computed_frequency = noteToFreq(index_of_note)
  noteOff(computed_frequency)
}
