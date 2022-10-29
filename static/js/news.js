'use strict';

function setINITIALnews(){    

    console.log(arrNews)
    const myArray = arrNews[0].split("!@#$%");
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
    
    for(let i=0;i<9;i++){
        // //    let temp = `${stringfornews_0}_${i}`
        // //    console.log(temp)
        //    localStorage.setItem(`${stringfornews_0}${i}`,articles[i]["title"])
        //    console.log(articles[i]["title"])
    
        //    localStorage.setItem(`${stringfornews_1}${i}`,articles[i]["url"])
        //    console.log(articles[i]["url"])
    
        //    localStorage.setItem(`${stringfornews_2}${i}`,articles[i]["urlToImage"])
        //    console.log(articles[i]["urlToImage"])
           
           let card_id=`cards${i}`;
           var y = document.getElementById(`${card_id}`);
        //    y.querySelector("img").src=articles[i]["urlToImage"];
        //    y.querySelector("h4").innerHTML=articles[i]["title"];
        //    y.querySelector("img").src=articles[i]["urlToImage"];
           
           y.querySelector("img").src=urlarr[i];
           y.querySelector("h4").innerHTML=titlearr[i];
           y.querySelector("img").src=imagesarr[i];
    
           let linkcard_id=`linkcards${i}`;
           var z = document.getElementById(`${linkcard_id}`);
           z.querySelector("a").href=urlarr[i];
    
       }  
   
}
