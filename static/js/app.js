const REDIRECT_URI = 'https://github.com/ashis-solomon';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SEARCH_URL = 'https://api.spotify.com/v1/search'
const RELEASE_URL = 'https://api.spotify.com/v1/browse/new-releases'

const CLIENT_ID = '65ff8b0793fb4cb5aee5e265bd0e7ae9';
const CLIENT_SECRET = '5d8fa454c17b43d8ae8db3b6842a6b17';
const REFRESH_TOKEN = 'AQDZmTL_rX9tOr_F2l91mvMKqV5moE5Q7jdC_5PYhRyJGhfD-34adz4m5rG9QQ-W8ZZDa-PZ0TffYUBXyadcorMrOU9l7bq1b7dA39po6-F3eS0-A66JsR9EG2Xxz80dA-A';


let access_token = null;

let search_result = [];
let search_res_track = [];
let items = [];

let search_results = [];
let search_artistIDs = [];
let search_artistNames = [];
let search_artistIDs_temp = [];
let search_artistNames_temp = [];
let search_trackNames = [];
let search_trackIDs = [];
let search_trackExplicit = [];
let search_trackPopularity = [];
let search_trackUrl = [];
let search_ReleaseDate = [];
let search_display = [];

// Splash Screen

const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded',(e)=>{
    setTimeout(()=>{
        splash.classList.add('display-none');
    },2000);
})


// GENERATE ACCESS-TOKEN USING REFRESH-TOKEN

function refreshAccessToken() {
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + REFRESH_TOKEN;
    body += "&client_id=" + CLIENT_ID;
    access_token = callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
    var data = JSON.parse(this.responseText);
    sessionStorage.setItem("access_token", data['access_token']);
}

// ON PAGELOAD

function onPageLoad(){
    console.log('PageLoad');

    if( window.localStorage ){
        if( !localStorage.getItem('initNEWS') ){
            setTimeout(()=>{
                console.log('initNEWS');
                localStorage['initNEWS'] = true;
                setINITIALnews();
            },3000);
          
          //setNewsItems
        }else{
            console.log('News Already There')
        }

        // if( !localStorage.getItem('current_time') ){
        //     console.log('current_time');
        //     localStorage['current_time'] = new Date();
        //     console.log(localStorage.getItem('current_time'));
        //   } 
        // if( localStorage.getItem('current_time') ){
        //     console.log('current_time1');
        //     console.log(localStorage.getItem('current_time'))
        //     let temp_str = localStorage.getItem('current_time')[8] + localStorage.getItem('current_time')[9];
        //     let pastDate = temp_str*1;
        //     console.log(pastDate)
        //     let temp_var = new Date() + '';
        //     let temp_str1 = temp_var[8] + temp_var[9];
        //     let currDate = temp_str1*1;
        //     console.log(currDate)

        //     if(!(currDate - pastDate)){
        //         console.log('EXISTING');
        //         // if manually cleared local storage then set the below comment to run once
        //         // setINITIALnews();
        //     }else{
        //         setTimeout(()=>{
        //             localStorage.clear();
        //             setINITIALnews();
        //             console.log('REFRESHED');
        //         },5000);

        //         //setNewsItems
        //     }
        
        //   } 
    }

    if( window.localStorage ){
    if( !localStorage.getItem('firstLoad') ){
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else{
        localStorage.removeItem('firstLoad');
    }
  }
    
  
    refreshAccessToken();
    setTimeout(() => {  
        callNEWS();
        access_token = window.sessionStorage.getItem('access_token');
        enable_newReleases(); }, 1000);
    // enable_newReleases();
}

// QuerySelector Variables

const suggestions = document.querySelector('#suggestions');
const suggest_list = document.querySelector('#suggestions')
const inputTrack = document.querySelector('#inputTrack');
const input_hidden = document.querySelector('#hoo');

// SEARCH FOR ITEM

async function searchItem(url){
    let response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    });
    let data = await response.json()
    return data;
}

async function enable_searchItem(query) {
    let offset = 0;
    let limit = 6;
    let market = 'US'
    let url = `${SEARCH_URL}?q=${query}&type=track&market=${market}&limit=${limit}&offset=${offset}`
    let resp = await searchItem(url)

    console.log(resp)
    
    for(let i=0; i<resp['tracks']['items'].length; i++){
        search_results[i] = resp['tracks']['items'][i];
    }

    items = resp['tracks']['items']
    for(let j=0; j<items.length; j++){
        search_trackNames[j] = items[j]['name']
        search_trackIDs[j] = items[j]['id']
        search_artistIDs_temp = []
        search_artistNames_temp = []
        search_trackExplicit[j] = items[j]['explicit']
        search_trackPopularity[j] = items[j]['popularity']
        search_trackUrl[j] = items[j]['external_urls']['spotify']
        search_ReleaseDate[j] = items[j]['album']['release_date']

        for(let i=0; i<items[j]['artists'].length; i++){
            search_artistIDs_temp[i] = items[j]['artists'][i]['id']
            search_artistNames_temp[i] = items[j]['artists'][i]['name']
        }
        search_artistIDs[j] = search_artistIDs_temp
        search_artistNames[j] = search_artistNames_temp
    }
    // console.log(search_trackNames)
    // console.log(search_trackIDs)
    // console.log(search_artistIDs)
    // console.log(search_artistNames)
    // console.log(search_trackExplicit)
    // console.log(search_trackPopularity)
    // console.log(search_trackUrl)
    // console.log(search_ReleaseDate)
    
    for(let i=0; i<items.length; i++){
        let artist_str = '';
        for(let j=0; j<search_artistNames[i].length; j++){
            if(j==0){
                artist_str = search_artistNames[i][j]
            }else{
                artist_str = artist_str + ', ' + search_artistNames[i][j]
            }
        }
        search_display[i] = search_trackNames[i] + ' - ' + artist_str
    }
    
}
    
function resolve_searchID(str){
    for(let i=0; i<search_display.length; i++){
        if(search_display[i] == str){
            return i;
        }
    }
}
