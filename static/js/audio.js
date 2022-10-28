const input_hidden = document.querySelector('#hoo');
let access_token = window.sessionStorage.getItem('access_token');

let TRACK_ID_1 = localStorage.getItem('trackID')
let ARTIST_IDS_t_1 = localStorage.getItem('artistIDs')

const ARTIST_IDS_1 = ARTIST_IDS_t_1.split(",");

console.log(TRACK_ID_1)
console.log(ARTIST_IDS_1)

'use strict';

//"https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6"


let avgg = [];

//let avg_value_dict = {}
const artist_ids = ARTIST_IDS_1;
let artstr='';
for(let i=0; i<artist_ids.length; i++){
    artstr=artstr+artist_ids[i]+'%2C'
}
artstr=artstr.slice(0, -3);
// console.log(artstr)
    

let track_id = TRACK_ID_1;


let track_url_for_year = `https://api.spotify.com/v1/tracks/${track_id}?market=US`
//https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl?market=ES"

let artist_url = `https://api.spotify.com/v1/artists?ids=${artstr}`



async function track_year(url,access_token) {
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

async function enable_track_year() {
    
    let jsondata = await track_year(track_url_for_year,access_token)
    console.log("hey")
    console.log(jsondata)
    let track_release_date=jsondata["album"]["release_date"]
    let track_explicit = jsondata["explicit"]
    let tracktempid = jsondata["id"]
    let curr_url = `https://api.spotify.com/v1/audio-features/${tracktempid}`
    console.log("hey")
    enable_curr_audio(curr_url,track_release_date,track_explicit)

}



async function getAudiofeatures(url,access_token) {
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

async function enable_curr_audio(curr_url,track_release_date,track_explicit) {
    
    let jsondata = await getAudiofeatures(curr_url,access_token)
    //console.log(jsondata)
    let avg_value_dict = {}
    //points.push(jsondata["energy"])
    avg_value_dict["danceability"] = jsondata["danceability"] 
    localStorage.setItem('danceability',avg_value_dict['danceability'])

    avg_value_dict["acousticness"] = jsondata["acousticness"]
    localStorage.setItem('acousticness',avg_value_dict['acousticness'])

    avg_value_dict["duration"] = jsondata["duration_ms"]
    localStorage.setItem('duration',avg_value_dict['duration'])

    avg_value_dict["energy"] = jsondata["energy"]
    localStorage.setItem('energy',avg_value_dict['energy'])

    avg_value_dict["s_id"] = jsondata["id"]
    localStorage.setItem('s_id',avg_value_dict['s_id'])

    avg_value_dict["instrumentalness"] = jsondata["instrumentalness"]
    localStorage.setItem('instrumentalness',avg_value_dict['instrumentalness'])

    avg_value_dict["key"] = jsondata["key"]
    localStorage.setItem('key',avg_value_dict['key'])

    avg_value_dict["liveness"] = jsondata["liveness"]
    localStorage.setItem('liveness',avg_value_dict['liveness'])

    avg_value_dict["loudness"] = jsondata["loudness"]
    localStorage.setItem('loudness',avg_value_dict['loudness'])

    avg_value_dict["mode"] = jsondata["mode"]
    localStorage.setItem('mode',avg_value_dict['mode'])

    avg_value_dict["speechiness"] = jsondata["speechiness"]
    localStorage.setItem('speechiness',avg_value_dict['speechiness'])

    avg_value_dict["time_signature"] = jsondata["time_signature"]
    localStorage.setItem('time_signature',avg_value_dict['time_signature'])

    avg_value_dict["tempo"] = jsondata["tempo"]
    localStorage.setItem('tempo',avg_value_dict['tempo'])

    avg_value_dict["valence"] = jsondata["valence"]
    localStorage.setItem('valence',avg_value_dict['valence'])

    avg_value_dict["release_date"] = track_release_date
    localStorage.setItem('release_date_',avg_value_dict['release_date'])

    avg_value_dict["explicit"] = track_explicit
    localStorage.setItem('explicit_',avg_value_dict['explicit'])
    // console.log("hello: "+avg_value_dict["tempo"])
    console.log(avg_value_dict)
    for (const [key, value] of Object.entries(avg_value_dict)) {
        console.log(key, value);
      }
    
    console.log(avg_value_dict)
    avgg[0] = avg_value_dict;
    //return avg_value_dict
}


async function gettrackpop(url,access_token) {
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

async function enable_track_pop() {
    
    let jsondata = await gettrackpop(artist_url,access_token)
    let artists_enc=jsondata["artists"]
    //console.log(artists_enc)
    const pop_art=[]
    const id_art=[]
    for(let i=0; i<artists_enc.length; i++){
        pop_art.push(artists_enc[i]["popularity"])
        id_art.push(artists_enc[i]["id"])
        
    }
    let grtpop=0
    let index_pop=0
    for(let j=0;j<pop_art.length;j++){
        if(pop_art[j]>grtpop){
            grtpop=pop_art[j]
            index_pop=j
        }
    }
    console.log("pop: " +  jsondata["artists"][index_pop]["popularity"] + " name: " +  jsondata["artists"][index_pop]["name"] + " id: " + jsondata["artists"][index_pop]["id"])
    localStorage.setItem('artistPop',jsondata["artists"][index_pop]["popularity"]);
    let most_popid=jsondata["artists"][index_pop]["id"]
    enable_albumids(`https://api.spotify.com/v1/artists/${most_popid}/albums?include_groups=single%2Calbum&market=US&limit=50&offset=0`)
    
    //return avg_value_dict
}




async function get_albumids(url,access_token) {
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

async function enable_albumids(arturl) {
    
    let jsondata = await get_albumids(arturl,access_token)
    // console.log(jsondata)
    //console.log("albumname "+ jsondata["items"][0]["name"])
    let items= jsondata["items"]
    //console.log(items[1]["name"])
    const album_ids = [];
    let albstr='';
    //console.log(items.length-1)
    //console.log("pop: " +  jsondata["artists"][0]["popularity"] + " name: " +  jsondata["artists"][0]["name"])
    let albtempindex = 20;
    if(items.length < 20){
        albtempindex = items.length;
    }
    for(let i=0; i<albtempindex; i++){
       album_ids.push(items[i]['name'])
       albstr=albstr+items[i]["id"]+'%2C'}
    //console.log(album_ids)
    albstr=albstr.slice(0, -3);
    // console.log(albstr)
    
    let alburl=`https://api.spotify.com/v1/albums?ids=${albstr}&market=US`


    //https://api.spotify.com/v1/artists/6M2wZ9GZgrQXHCFfjv46we/albums?include_groups=single%2Calbum&market=US&limit=50&offset=0


    enable_trackids(alburl)
    //return avg_value_dict
}


async function get_trackids(url,access_token) {
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

async function enable_trackids(alburl) {
    
    let jsondata = await get_trackids(alburl,access_token)
    //console.log("albumname "+ jsondata["items"][0]["name"])
    //albums=jsondata["album"]
    //console.log(albums)
    let alb=jsondata["albums"]
    console.log(jsondata)
    let trkstr='';
    // console.log("hey")
    // console.log(alb)
    // console.log("ehy")
    const track_enclose_ids = [];
    for(let i=0; i<alb.length; i++){
         track_enclose_ids.push(alb[i]["tracks"]["items"])

      }
    const track_ids = []; 
    const track_names =[];  
    //console.log(track_enclose_ids) 
   
    // console.log(track_enclose_ids[2].length) 
    for(let x=0; x<track_enclose_ids.length; x++){
        for(let y=0; y<track_enclose_ids[x].length;y++){
            track_ids.push(track_enclose_ids[x][y]["id"])
            track_names.push(track_enclose_ids[x][y]["name"])
        }

     }
    //  console.log(track_names)
    //  console.log(track_ids)
    //return avg_value_dict
    let n=0;
    if(track_ids.length>100){
        n=100
    }
    else{
        n=track_ids.length
    }

    for(let i=0; i<n; i++){
        
        trkstr=trkstr+track_ids[i]+'%2C'
    }
    
        trkstr=trkstr.slice(0, -3);
        // console.log(trkstr);
     
     let trkurl=`https://api.spotify.com/v1/audio-features?ids=${trkstr}`;
     let trkgetstr1=''
     let trkgetstr2=''
     let trkgeturl1=''
     let trkgeturl2=''
     if(n>50){
        for(let i=0; i<50; i++){
            trkgetstr1=trkgetstr1+track_ids[i]+'%2C'
        }
        trkgetstr1=trkgetstr1.slice(0, -3);
        //"https://api.spotify.com/v1/tracks?market=US&ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B"
        trkgeturl1=`https://api.spotify.com/v1/tracks?market=US&ids=${trkgetstr1}`;
        //enable_get_sev_track(trkgeturl1)
        // console.log(trkgeturl1)
        for(let i=50;i<n;i++){
            trkgetstr2=trkgetstr2+track_ids[i]+'%2C'
        }
        trkgetstr2=trkgetstr2.slice(0, -3);
        //"https://api.spotify.com/v1/tracks?market=US&ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B"
        trkgeturl2=`https://api.spotify.com/v1/tracks?market=US&ids=${trkgetstr2}`;
        //enable_get_sev_track(trkgeturl2)
        enable_get_sev_track(trkgeturl1,trkgeturl2,n,trkurl)
        // console.log(trkgeturl2)
     }
     else{
        for(let i=0; i<n; i++){
            trkgetstr1=trkgetstr1+track_ids[i]+'%2C'
        }
        trkgetstr1=trkgetstr1.slice(0, -3);
        //"https://api.spotify.com/v1/tracks?market=US&ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B"
        trkgeturl1=`https://api.spotify.com/v1/tracks?market=US&ids=${trkgetstr1}`;
        //console.log("dgfdy")
        // console.log(trkurl)
        enable_get_sev_track(trkgeturl1,trkgeturl2,n,trkurl)
     }

     //enable_track_audio(trkurl);
}

async function get_sev_track(url,access_token) {
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

async function enable_get_sev_track(trkurl1,trkurl2,n,trkurl)
{
    let jsonData1;
    let jsonData2;
    let jsonfinaldata={}
    if(n>50){
    jsonData1=await get_sev_track(trkurl1,access_token);
    // console.log(jsonData1["tracks"])
    jsonData2=await get_sev_track(trkurl2,access_token);
    // console.log(jsonData2["tracks"])
    for(let i=0;i<50;i++){
        jsonfinaldata[i]=jsonData1["tracks"][i]
    }
    for(let i=0;i<n-50;i++){
        jsonfinaldata[i+50]=jsonData2["tracks"][i]
    }
    //console.log(jsonfinaldata)
    }
    else{
        jsonData1=await get_sev_track(trkurl1,access_token);
        for(let i=0;i<n;i++){
            jsonfinaldata[i]=jsonData1["tracks"][i]
        }
        //console.log(jsonfinaldata)  
    }
    // console.log("jjjj")
    // console.log(jsonfinaldata)
    //console.log(n)
    //console.log(track_names)
    //let all=jsonData["audio_features"];
    // console.log(trkurl)
    enable_track_audio(trkurl,jsonfinaldata);
}


async function get_track_audio(url,access_token) {
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

async function enable_track_audio(trkurl,jsonfinaldata)
{
    let jsonData=await get_track_audio(trkurl,access_token);
    console.log(jsonData)
    //console.log(n)
    //console.log(track_names)
    let all=jsonData["audio_features"];
    //console.log(all);
    /*for(let i=0;i<n;i++){
        all[i]["name"]=track_names[i]
    }*/
    // console.log("belh")
    // console.log(all)
    // console.log("blehhhhh")
    // console.log(jsonfinaldata)
    for(let i=0;i<all.length;i++){
        try {
            if(all[i]["id"]==jsonfinaldata[i]["id"]){
                all[i]["name"]=jsonfinaldata[i]["name"]
                all[i]["explicit"]=jsonfinaldata[i]["explicit"]
                all[i]["popularity"]=jsonfinaldata[i]["popularity"]}
          }
          catch(err) {
            console.log('error')
          }
    }
    console.log(all)
    const myJSON = JSON.stringify(all);
    // console.log('myJSON')
    // console.log(myJSON)
    console.log(avgg[0])

    const myJSON1 = JSON.stringify(avgg[0]);
    console.log(myJSON1)
    
    let route_pass = myJSON + `!@#$%${localStorage.getItem('artistPop')}` + `!@#$%${myJSON1}`;

    // console.log(route_pass)
    input_hidden.value = route_pass
}


enable_track_year();
enable_track_pop();

// console.log(avg_value_dict["tempo"])
//console.log(points)


async function getIMGurl(url,access_token) {
    let response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    });
    let data = await response.json();
    return data;
}

async function enable_IMGurl(trackID)
{
    URL = `https://api.spotify.com/v1/tracks/${trackID}`;
    let jsondata = await getIMGurl(URL,access_token);
    console.log(jsondata);
    console.log(jsondata["album"]["images"]);
    console.log(jsondata["album"]["images"][2]["url"]);
    localStorage.setItem('IMGurl',jsondata["album"]["images"][2]["url"]);
}

enable_IMGurl(localStorage.getItem('trackID'));
   
