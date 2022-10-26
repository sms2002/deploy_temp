localStorage.setItem('IMGcolor',`rgba(${Math.floor(Math.random() * 230)},${Math.floor(Math.random() * 230)},${Math.floor(Math.random() * 230)},1)`)


function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function convertMsToMinutesSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);
  
    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${padTo2Digits(seconds)}`;
  }
  

var D1 = document.getElementById('D1');
var D2 = document.getElementById('D2');
var D3 = document.getElementById('D3');
var D4 = document.getElementById('D4');
var D5 = document.getElementById('D5');
var exp = document.getElementById('exp');
console.log(exp)

// D1.innerHTML = `Duration : ${localStorage.getItem('duration')/60000} min ${localStorage.getItem('duration')%60000} sec`
D1.innerHTML = `Duration : ${convertMsToMinutesSeconds(localStorage.getItem('duration'))}`
D2.innerHTML = `Tempo : ${localStorage.getItem('tempo')}`
D3.innerHTML = `Explicit : ${localStorage.getItem('trackExplicit')}`
if(localStorage.getItem('trackExplicit') == 'true'){
      exp.querySelector("img").style = "";
}else{
      exp.querySelector("img").style = "visibility: hidden";
}
D4.innerHTML = `Loudness : ${localStorage.getItem('loudness')}`

var dict = {
  0 : "C",
  1 : "C#",
  // 1 : "C♯ / D♭",
  2 : "D",
  3 : "D#",
  // 3 : "D♯ / E♭",
  4 : "E",
  5 : "F",
  6 : "F#",
  // 6 : "F♯ / G♭",
  7 : "G",
  8 : "G#",
  // 8 : "G♯ / A♭",
  9 : "A",
  10 : "A#",
  // 10 : "A♯ / B♭",
  11 : "B",

}

let minmajor = "";
if(localStorage.getItem('mode')==0){
  minmajor = " Minor"
}else{
  minmajor = " Major"
}
D5.innerHTML = `Key : ${dict[localStorage.getItem('key')]+minmajor}`

