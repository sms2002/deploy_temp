'use strict';

function setINITIALnews(){    
    
    const arr=[]
    function readTextFile(file)
    {
        console.log('a')
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    console.log(allText);
                    arr.push(allText)
                }
            }
        }
        rawFile.send(null);
    }

    readTextFile("./inputNews.txt");
    console.log(arr)
    const myArray = arr[0].split("!@#$%");
    console.log(myArray.length)
    for(let i=0;i<myArray.length;i++){
        console.log(myArray[i])
        //console.log(myArray[i]["url"])
    // console.log(myArray[i]["urlToImage"])
    }
    console.log("hello")
    console.log(myArray)
    const titlearr = []
    const urlarr = []
    const imagesarr = []
    for(let i=0;i<myArray.length;i=i+3){
    titlearr.push(myArray[i])
    urlarr.push(myArray[i+1])
    imagesarr.push(myArray[i+2])
    }
    console.log("heyyy")
    console.log(titlearr)
    console.log(urlarr)
    console.log(imagesarr)
    
    let api_key = "5ded574a864b45148274ffb0adc49f2c";
    console.log('APII')
    let curr_url = `https://newsapi.org/v2/everything?q=music&domains=billboard.com&language=en&apiKey=${api_key}`

    let stringfornews_0 = `storage_0_`;
    let stringfornews_1 = `storage_1_`;
    let stringfornews_2 = `storage_2_`;

    fetch(curr_url).then((res)=>{
        return res.json()
    }).then((data)=>{
       return data["articles"]
    }).then((articles)=>{
       for(let i=0;i<9;i++){
        //    let temp = `${stringfornews_0}_${i}`
        //    console.log(temp)
           localStorage.setItem(`${stringfornews_0}${i}`,articles[i]["title"])
           console.log(articles[i]["title"])
    
           localStorage.setItem(`${stringfornews_1}${i}`,articles[i]["url"])
           console.log(articles[i]["url"])
    
           localStorage.setItem(`${stringfornews_2}${i}`,articles[i]["urlToImage"])
           console.log(articles[i]["urlToImage"])
           
           let card_id=`cards${i}`;
           var y = document.getElementById(`${card_id}`);
           y.querySelector("img").src=articles[i]["urlToImage"];
           y.querySelector("h4").innerHTML=articles[i]["title"];
           y.querySelector("img").src=articles[i]["urlToImage"];
           
    
           let linkcard_id=`linkcards${i}`;
           var z = document.getElementById(`${linkcard_id}`);
           z.querySelector("a").href=articles[i]["url"];
    
       }
    });
}

function callNEWS(){
    for(let i=0;i<9;i++){
        let card_id=`cards${i}`;
        var y = document.getElementById(`${card_id}`);
 
        let stringfornews_0 = `storage_0_`;
        let stringfornews_1 = `storage_1_`;
        let stringfornews_2 = `storage_2_`;   
 
        y.querySelector("h4").innerHTML = localStorage.getItem(`${stringfornews_0}${i}`);
        y.querySelector("img").src = localStorage.getItem(`${stringfornews_1}${i}`);
        y.querySelector("img").src = localStorage.getItem(`${stringfornews_2}${i}`);
 
        let linkcard_id=`linkcards${i}`;
        var z = document.getElementById(`${linkcard_id}`);
        z.querySelector("a").href = localStorage.getItem(`${stringfornews_1}${i}`);
 
    }
}
