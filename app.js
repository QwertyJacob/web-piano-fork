const WHITE_KEYS = ["z", "x", "c", "v", "b", "n", "m", ","];
const BLACK_KEYS = ["s", "d", "g", "h", "j"];
const c = new AudioContext();
const comp = c.createDynamicsCompressor();
const attack = 0.1;
const release = 0.1;
const gains = [];
const oscillators = [];

comp.connect(c.destination);

let keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");

for(const key of keys){
  key.addEventListener("click", () => playNote(key));
}

document.addEventListener("keydown", (e) => {
  if(e.repeat){
    return;
  }

  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);


  if(whiteKeyIndex > -1){
    noteOn(whiteKeys[whiteKeyIndex]);
  }else if(blackKeyIndex > -1){
    noteOn(blackKeys[blackKeyIndex]);
  }
});

document.addEventListener("keyup", (e) => {
  if(e.repeat){
    return;
  }

  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);


  if(whiteKeyIndex > -1){
    noteOff(whiteKeys[whiteKeyIndex]);
  }else if(blackKeyIndex > -1){
    noteOff(blackKeys[blackKeyIndex]);
  }
});

function noteOff(freq) {
  var g = gains[freq]
  var o = oscillators[freq];
  g.gain.exponentialRampToValueAtTime(0.1, c.currentTime + release);
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
