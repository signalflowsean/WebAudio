'use strict';   
/*eslint-env jquery*/

let audioContext= new AudioContext(); 
// let oscillator; 

console.log('who dat yo'); 
let oscProp = {
  waveType : 'sine',
  freq : 100, 
  playing : false 
};


class MyWorkletNode extends AudioWorkletNode {
  constructor(context) {
    super(context, 'processor');
  }
}

let played; 
let oscillator; 
//let processer; 
function renderAudio(){ 
  console.log('what2', audioContext); 

  audioContext.audioWorklet.addModule('processor.js').then(() => {
    
    if (oscProp.playing && !played){ 
      oscillator = new OscillatorNode(audioContext); 
      let processer = new MyWorkletNode(audioContext, 'processor.js');
      oscillator.connect(processer).connect(audioContext.destination); 
      oscillator.start(audioContext.currentTime); 
      played = true; 
    }
    else { 
      oscillator.stop(audioContext.currentTime); 
      played = false; 
    }
    oscillator.type = oscProp.waveType; 
    oscillator.frequency.setValueAtTime(oscProp.freq, audioContext.currentTime); 


 
  });

  // eslint-disable-next-line no-console
  console.log('handleFreqSlider', 'ran'); 
}


function handleTransport(){ 
  $('.transport').on('click', function(){
    setDataIsPlaying(); 

    renderAudio(oscProp.playing); 
  
  }); 

  // eslint-disable-next-line no-console
  console.log('handleTransport', 'ran'); 
}

function handleWaveType(){ 
  $('.wave-type').on('click', function(event){ 
    setDataWaveType($(event.target).val()); 
    renderAudio(); 
  }); 

  // eslint-disable-next-line no-console
  console.log('handleWaveType', 'ran'); 
}

function handleFreqSlider(){ 
  $('.freqslider').on('input', function(event){ 
    setDataFreq($(event.target).val());
    renderAudio();  
  }); 

  // eslint-disable-next-line no-console
  console.log('handleFreqSlider', 'ran'); 
}

function initAudioSite(){ 
  handleTransport(); 
  handleWaveType(); 
  handleFreqSlider(); 

  // eslint-disable-next-line no-console
  console.log('initAudioSite', 'ran'); 
}

function setDataIsPlaying(){ 
  oscProp.playing = !oscProp.playing; 
}

function setDataWaveType(type){ 
  oscProp.waveType = type; 
}

function setDataFreq(freq){ 
  oscProp.freq = freq; 
}

$(initAudioSite); 

// let audioContext = new AudioContext(); 

// let oscillator = audioContext.createOscillator();

// //oscillators have three properties: type, frequency, detune
// //oscillator type offered 'square', 'sawtooth', 'triangle', 'sine'
// oscillator.type = 'sawtooth'; 

// //set frequency
// oscillator.frequency.setValueAtTime(200, audioContext.currentTime);  

// //value in cents
// oscillator.detune.setValueAtTime(200, audioContext.currentTime + 1); 

// oscillator.detune.setValueAtTime(400, audioContext.currentTime + 2); 

// //connects oscillator to the audio context
// oscillator.connect(audioContext.destination); 

// //any node before make sure connected in chain
// // oscillator.connect(filter); 
// // filter.connect(audioContext.destination); 

// //starts two seconds later
// // oscillator.start(audioContext.currentTime + 2);

// oscillator.start(audioContext.currentTime); 

// //stops after three seconds
// //once it stops can't restart it, must create a new oscillator
// oscillator.stop(audioContext.currentTime + 3); 

// //callback when oscillator has ended
// oscillator.onended = function(){ 
//   // eslint-disable-next-line no-console
//   console.log('Audio Finished Playing'); 
//   //can create a new oscillator here
// }; 

//oscillator
// --onended 
// --type
// --frequency
// --detune