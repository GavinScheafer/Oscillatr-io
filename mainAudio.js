var timerID;
var isOn = true;
var myAudioContext = new AudioContext();

var myOscillator = myAudioContext.createOscillator();
var myGain = myAudioContext.createGain();
myOscillator.type = "triangle";

var pitchArray = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,440.0]
var volumeArray = [-6,-6,-6,-6,-6,-6,-6,-6]
var counter = 0;
var score = 0;

function scaleImage() {
    var image = document.getElementById("cassetteImage");
    image.style.transform = "scale(1.1)";
    setTimeout(function() {
        image.style.transform = "scale(1)"; 
    }, 50); 
}

function playSound() {
	counter = 0;
	myOscillator.frequency.value = 0;
	myGain.gain.setValueAtTime(0., myAudioContext.currentTime);
	myOscillator.connect(myGain);
	myGain.connect(myAudioContext.destination);
	if(isOn) {
		myOscillator.start(myAudioContext.currentTime);
	}
	isOn = true;
	timerID = setInterval(playNote, 125);
}

function playNote(){
	document.getElementById("score").innerHTML = "Score: " + score
	myOscillator.frequency.linearRampToValueAtTime(pitchArray[counter], myAudioContext.currentTime);
	myGain.gain.setValueAtTime(0., myAudioContext.currentTime+0.005);
	myGain.gain.linearRampToValueAtTime(dbtoa(volumeArray[counter]), myAudioContext.currentTime+0.05);
	myOscillator.frequency.setValueAtTime(0., myAudioContext.currentTime + 0.1);
	myGain.gain.linearRampToValueAtTime(0., myAudioContext.currentTime+0.1);
	if (pitchArray[counter] > 0){
		score += 1;
		scaleImage();
	}
	counter = (counter+1)%8;
}

function dbtoa(dB){
	return Math.pow(10,dB*0.05);
}

function spendBeats(amount, index, pitch) {
	if(score >= amount) {
		score -= amount;
		if (score < 0){
			score = 0;
		}
		document.getElementById("score").innerHTML = "Score: " + score
		
		pitchArray.splice(index, 1, pitch)
	}
}

function spendTwoBeats(amount, index1, index2, pitch1, pitch2) {
	if(score >= amount) {
		score -= amount;
		if (score < 0){
			score = 0;
		}
		document.getElementById("score").innerHTML = "Score: " + score
		
		pitchArray.splice(index1, 1, pitch1)
		pitchArray.splice(index2, 1, pitch2)
	}
}

function spendThreeBeats(amount, index1, index2, index3, pitch1, pitch2, pitch3) {
	if(score >= amount) {
		score -= amount;
		if (score < 0){
			score = 0;
		}
		document.getElementById("score").innerHTML = "Score: " + score
		
		pitchArray.splice(index1, 1, pitch1)
		pitchArray.splice(index2, 1, pitch2)
		pitchArray.splice(index3, 1, pitch3)
	}
}

function spendFourBeats(amount, index1, index2, index3, index4, pitch1, pitch2, pitch3, pitch4) {
	if(score >= amount) {
		score -= amount;
		if (score < 0){
			score = 0;
		}
		document.getElementById("score").innerHTML = "Score: " + score
		
		pitchArray.splice(index1, 1, pitch1)
		pitchArray.splice(index2, 1, pitch2)
		pitchArray.splice(index3, 1, pitch3)
		pitchArray.splice(index4, 1, pitch4)
	}
}

function startSound() {
	isOn = true;
	playSound();
}

function stopSound() {
	isOn = false;
	clearInterval(timerID);
	//myOscillator.stop(myAudioContext.currentTime + 0.1);
	myOscillator.disconnect();
}