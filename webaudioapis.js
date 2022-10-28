let c = new AudioContext();
let comp = c.createDynamicsCompressor();
let attack = 0.1;
let release = 0.1;
let gains = [];
let oscillators = [];
let hardcoded_frequencies = [523.25, 554.37,  587.33, 622.25,  659.25,  698.46,  739.99,  783.99,  830.61,  880.00,  932.33,  987.77]
let exercise_keys = "awsedftgyhujk";


comp.connect(c.destination);



function noteOn(freq) {
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

/*
* This function is going to turn off the sound
* */
function noteOff(freq) {
    let g = gains[freq]
    let o = oscillators[freq];
    g.gain.exponentialRampToValueAtTime(0.1, c.currentTime + release);
    o.stop(c.currentTime + release);
}

function noteToFreq(note) {return 440*Math.pow(2,note/12)}


/*
document.body.onkeydown = function (e) {
    if (!e.repeat) {

        let index_of_key = keys.indexOf(e.key)

        let computed_frequency = noteToFreq(index_of_key)

        noteOn(computed_frequency)

    }

}


document.body.onkeyup = function(e) {
  let index_of_note = exercise_keys.indexOf(e.key)
  let referenced_frequency =  hardcoded_frequencies[index_of_note]
  noteOff(referenced_frequency)
}

*/