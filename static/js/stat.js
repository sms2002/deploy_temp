var IMG = document.getElementById('trkIMG');

IMG.querySelector("img").src = localStorage.getItem('IMGurl');
IMG.querySelector("img").alt = localStorage.getItem('trackDisplayName');

IMG.querySelector("img").width = 256;
IMG.querySelector("img").height = 256;

console.log(IMG)


const fac = new FastAverageColor();
var container = document.getElementById('image-container');
// container.querySelector("img").src = 'https://i.scdn.co/image/ab67616d0000b27304bfd5a5fd5aa6ca648f66aa';
let color;
fac.getColorAsync(localStorage.getItem('IMGurl'))
        .then(color => {
            container.style.backgroundColor = color.rgba;
            container.style.color = color.isDark ? '#fff' : '#000';
            localStorage.setItem('IMGcolor',color['rgba'])
            console.log('Average color', color);
        })
        .catch(e => {
            console.log(e);
        });

console.log(localStorage.getItem('IMGcolor'));



var TRK = document.getElementById('trk');
TRK.innerHTML = `${localStorage.getItem('trackDisplayName')}`

// console.log(localStorage.getItem('trackDisplayName').split('-'))
console.log(TRK)

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

