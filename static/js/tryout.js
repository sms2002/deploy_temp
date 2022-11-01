const b1_SUBMIT = document.getElementById('b1_SUBMIT');
const b2_RESET = document.getElementById('b2_RESET');
const b3_RANDOM = document.getElementById('b3_RANDOM');

function onPageLoadReset(){
    b2_RESET.click();
}

const dict_key = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "speechiness",
    "valence",
    "key",
    "mode",
    "explicit",
    "duration",
    "loudness",
    "tempo"
]

const dict = {}

var el1 = [];
var el2 = [];
var text_label = [];
for(let i=1; i<8; i++){
    text_label[i] = document.getElementById(`${i}`);
    text_label[i].innerHTML = dict_key[i-1].toUpperCase();
    text_label[i].innerHTML = text_label[i].innerHTML.charAt(0).toUpperCase() + text_label[i].innerHTML.slice(1,);
    el1[i] = document.getElementById(`textTRY${i}`);
    el2[i] = document.getElementById(`rangeTRY${i}`);
}

// console.log(el1)
// console.log(el2)

for(let i=1; i<8; i++){
    el1[i].addEventListener('input', function () {
        el2[i].value = this.value;
    });

    el2[i].addEventListener('input', function () {
        el1[i].value = this.value;
    });
}


var dur = document.getElementById('l1');
dur.addEventListener('input', function (){
    dict[`duration`] = dur.value/1;
});

var loud = document.getElementById('l2');
loud.addEventListener('input', function (){
    dict[`loudness`] = loud.value/1;
});

var tem = document.getElementById('l3');
tem.addEventListener('input', function (){
    dict[`tempo`] = tem.value/1;
});

b2_RESET.addEventListener('click', function (){
    for(let i=1; i<8; i++){
        el1[i].value = 50;
        el2[i].value = 50;
    }
    
    dur.value = "";
    dict[`duration`] = dur.value;

    loud.value = "";
    dict[`loudness`] = loud.value;

    tem.value = "";
    dict[`tempo`] = tem.value;

    // document.mainForm.rads.value = ""
    // document.mainForm1.mod.value = ""
    // document.mainForm2.exp.value = ""

});

b3_RANDOM.addEventListener('click', function (){
    for(let i=1; i<8; i++){
        el1[i].value = Math.floor(Math.random() * 101);
        el2[i].value = el1[i].value;
    }

    dur.value = getRandomInt(130000, 300000);
    dict[`duration`] = dur.value/1;

    loud.value = getRandomFloat(-4, -12);
    dict[`loudness`] = loud.value/1;

    tem.value = getRandomInt(60, 160);
    dict[`tempo`] = tem.value/1;

    document.mainForm.rads.value = Math.floor(Math.random() * 12)
    document.mainForm1.mod.value = Math.floor(Math.random() * 2)
    document.mainForm2.exp.value = Math.floor(Math.random() * 2)

});

document.mainForm1.onclick = function(){
    var modVal = document.mainForm1.mod.value;
    // console.log(modVal + 'mod')
}

document.mainForm2.onclick = function(){
    var expVal = document.mainForm2.exp.value;
    // console.log(expVal + 'exp')
}

document.mainForm.onclick = function(){
    var radVal = document.mainForm.rads.value;
    // console.log(radVal);
}

b1_SUBMIT.addEventListener('click', function(){
    console.log(dict_key.length)

    // if (dur.value == null || dur.value == "" || tem.value == null || tem.value == "") {
    if (dur.value.trim().length==0 || tem.value.trim().length==0 || loud.value.trim().length==0 || document.mainForm.rads.value=="" || document.mainForm1.mod.value=="" || document.mainForm2.exp.value=="") {
        alert("Please Fill All Required Fields");
    }else{
        for(let i=0; i<7; i++){
            dict[`${dict_key[i]}`] = el1[i+1].value/100;
        }

        dict["mode"] = document.mainForm1.mod.value/1;
        // dict["explicit"] = document.mainForm2.exp.value/1;
        if(document.mainForm2.exp.value/1 == 0){
            dict["explicit"] = "false";
        }else{
            dict["explicit"] = "true";
        }

        dict["key"] = document.mainForm.rads.value/1;
        // console.log('key ' + document.mainForm.rads.value)
        console.log(dict);

        for(let i=0; i<dict_key.length; i++){
            localStorage.setItem(`${dict_key[i]}`,dict[`${dict_key[i]}`]);
            console.log(`${dict_key[i]}` + dict[`${dict_key[i]}`])
        }
        localStorage.setItem(`explicit_`,dict[`explicit`]);
        localStorage.setItem(`trackExplicit`,dict[`explicit`]);

        const my_JSON = JSON.stringify(dict);
        console.log(my_JSON)

        let webLink = `/statTRY?details=${my_JSON}`;
        location.href = webLink;

        //let webLink = `/statTRY`;
        //location.href = webLink;
    }

});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomFloat(min, max) {
    return Math.floor(Math.random() * (max*10 - min*10) + min*10)/10;
  }