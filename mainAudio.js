var timerID;
var isOn = false;
var myAudioContext = new AudioContext();

var myOscillator = myAudioContext.createOscillator();
var myGain = myAudioContext.createGain();
myOscillator.type = "triangle";

var pitchArray = [0,0,0,440]
var volumeArray = [0,0,0,-6]
var counter = 0;
var score = 0;

function playSound() {
	counter = 0
	myOscillator.frequency.value = 0;
	myGain.gain.setValueAtTime(0., myAudioContext.currentTime);
	myOscillator.connect(myAudioContext.destination);

	myOscillator.start(myAudioContext.currentTime);
	timerID = setInterval(playNote, 250);
}

function playNote(){
	document.getElementById("score").innerHTML = "Score: " + score
	myOscillator.frequency.setValueAtTime(pitchArray[counter], myAudioContext.currentTime);
	myGain.gain.linearRampToValueAtTime(dbtoa(volumeArray[counter]), myAudioContext.currentTime+0.005);
	myGain.gain.setValueAtTime(dbtoa(volumeArray[counter]), myAudioContext.currentTime+0.09);
	myGain.gain.linearRampToValueAtTime(0., myAudioContext.currentTime+0.1);
	myOscillator.frequency.setValueAtTime(0., myAudioContext.currentTime + 0.05);
	if (counter == 3){
		score += 1;
	}
	counter = (counter+1)%4;
}

function dbtoa(dB){
	return Math.pow(10,dB*0.05);
}

function spendBeats(amount) {
	score -= amount;
	if (score < 0){
		score = 0;
	}
	document.getElementById("score").innerHTML = "Score: " + score
}

function stopSound() {
	clearInterval(timerID);
	myOscillator.stop(myAudioContext.currentTime + 0.1);
	myOscillator.disconnect();
}