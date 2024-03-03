var timerID;
var isOn = false;
var myAudioContext = new AudioContext();

var myOscillator = myAudioContext.createOscillator();
var myGain = myAudioContext.createGain();
myOscillator.type = "triangle";

var pitchArray = [0,0,0,440]
var volumeArray = [0,0,0,-6]
var counter = 0;

function playSound() {
	counter = 0
	myOscillator.frequency.value = 0;
	myGain.gain.setValueAtTime(0., myAudioContext.currentTime);
	myOscillator.connect(myAudioContext.destination);

	myOscillator.start(myAudioContext.currentTime);
	timerID = setInterval(playNote, 250);
}

function playNote(){
	myOscillator.frequency.setValueAtTime(pitchArray[counter], myAudioContext.currentTime);
	myGain.gain.linearRampToValueAtTime(dbtoa(volumeArray[counter]), myAudioContext.currentTime+0.005);
	myGain.gain.setValueAtTime(dbtoa(volumeArray[counter]), myAudioContext.currentTime+0.09);
	myGain.gain.linearRampToValueAtTime(0., myAudioContext.currentTime+0.1);
	myOscillator.frequency.setValueAtTime(0., myAudioContext.currentTime + 0.05);
	counter = (counter+1)%4;
}

function dbtoa(dB){
	return Math.pow(10,dB*0.05);
}