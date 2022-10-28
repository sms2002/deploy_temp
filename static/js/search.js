// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

let suggestionsAuto = [];

// if user press any key and release
inputBox.onkeyup = (e)=>{
    console.log(e.target.value)
    enable_searchItem(e.target.value)

    setTimeout(() => {  
        console.log(search_display)
        suggestionsAuto = search_display;
        let userData = e.target.value; //user enetered data
        let emptyArray = [];
        if(userData){
            icon.onclick = ()=>{
                // var webLink = `http://127.0.0.1:5000/audio?name=searchBox`;
                // location.href = webLink;
                
                console.log(localStorage.getItem('tempIndex1'))
                for(let i=0; i<search_display.length; i++){
                    if(userData == search_display[i]){
                        set_value(i);
                        let webLink = `/audio?displayName=${search_display[i]}&trkID=${search_trackIDs[i]}&trkPop=${search_trackPopularity[i]}`;
                        location.href = webLink;
                    }
                }

                // linkTag.setAttribute("href", webLink);
                // linkTag.click();
            }
            emptyArray = suggestionsAuto.filter((data)=>{
                //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                // return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                return data;
            });
            emptyArray = emptyArray.map((data)=>{
                // passing return data inside li tag
                return data = `<li>${data}</li>`;
            });
            searchWrapper.classList.add("active"); //show autocomplete box
            showSuggestions(emptyArray);
            let allList = suggBox.querySelectorAll("li");
            for (let i = 0; i < allList.length; i++) {
                //adding onclick attribute in all li tag
                allList[i].setAttribute("onclick", "select(this)");
            }
        }else{
            searchWrapper.classList.remove("active"); //hide autocomplete box
        }
    }, 200);
    
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    for(let i=0; i<search_display.length; i++){
        if(selectData == search_display[i]){
            console.log('index = ' + i)
            console.log(search_trackIDs[i])
            set_value(i);
        let webLink = `/audio?displayName=${search_display[i]}&trkID=${search_trackIDs[i]}&trkPop=${search_trackPopularity[i]}`;
        location.href = webLink;
        }
    }
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

function set_value(resolved_id){
    localStorage.setItem('trackDisplayName',search_display[resolved_id])
    localStorage.setItem('trackID',search_trackIDs[resolved_id])
    localStorage.setItem('artistIDs',search_artistIDs[resolved_id])
    localStorage.setItem('trackExplicit',search_trackExplicit[resolved_id])
    // localStorage.setItem('trackReleaseDate',search_ReleaseDate[resolved_id])
    // localStorage.setItem('trackPopularity',search_trackPopularity[resolved_id])
    localStorage.setItem('trackUrl',search_trackUrl[resolved_id])    

    // let route_pass = search_trackIDs[resolved_id] + ',' + search_trackNames[resolved_id] + ',' + search_trackPopularity[resolved_id]
    // localStorage.setItem('routePass',route_pass)
        
}