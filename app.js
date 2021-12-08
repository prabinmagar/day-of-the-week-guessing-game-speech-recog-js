const messageDiv = document.getElementById('message');
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const resultText = document.getElementById('result');
// random day of the week
let randomDay = daysOfTheWeek[Math.floor(Math.random() * 7) + 1];
// console.log(randomDay);

// speech recognition init
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = new window.SpeechRecognition();

recog.start();
recog.addEventListener('result', getUserSpeech);
recog.addEventListener('end', () => recog.start());

// getting users speech
function getUserSpeech(e){
    // console.log(e.results[0][0].transcript);
    let message = e.results[0][0].transcript;
    showMessage(message);
}

//showing user's speech
function showMessage(message){
    messageDiv.innerHTML = `<div> You said: ${message} </div>`;
    checkDaysOfTheWeek(message);
}

 // checking the guess
 function checkDaysOfTheWeek(message){
     if(randomDay == message){
         resultText.innerHTML = `<span style = "color: #00F700;"> Your guess is correct! </span> <br> <button id = "play-again-btn"> Play Again </button>`;
         recog.addEventListener('end', () => recog.abort());
     } else {
         resultText.innerHTML = `<span style = "color: #F54A19;"> Oops! Your guess is incorrect! Try Again. </span>`;
     }
 }

 // restarting the guessing game
 document.body.addEventListener('click', (e) => {
     if(e.target.id == 'play-again-btn') window.location.reload();
 });

