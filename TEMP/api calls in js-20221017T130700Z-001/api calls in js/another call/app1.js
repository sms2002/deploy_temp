

'use strict';

//"https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6"



//let avg_value_dict = {}
const artist_ids = ["1mYsTxnqsietFxj1OgoGbG"];
let artstr='';
for(let i=0; i<artist_ids.length; i++){
    artstr=artstr+artist_ids[i]+'%2C'
}
artstr=artstr.slice(0, -3);
console.log(artstr)
    


let access_token = "BQAF2JZ-Al-YivqlYVAxPymERNj1rsfW8YHYXl17yi7df4vj7PJtMXxv4N15MLShytizKArj-1xqGZHkOul0JGlwbpbzAFNVyGJs6Bsm9ELilngdZJBSJZUCZsyM-D-m3XOYqEpYOPGhGDlVITQpsm9kyRbTo-QKqZ39kQHWP4fBiOFh4jQxvrbtOBFRzoz-JEI";
 
let track_id ="2takcwOaAZWiXQijPHIx7B"


//let artist2 ="3MZsBdqDrRTJihTHQrO6Dq"
//let artist1 ="6KImCVD70vtIoJWnq6nGn3"
//let artist3 = "4yvcSjfu4PC0CYQyLy4wSq"
//let url = "https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl"
let curr_url = `https://api.spotify.com/v1/audio-features/${track_id}`


let artist_url = `https://api.spotify.com/v1/artists?ids=${artstr}`





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

async function enable_curr_audio() {
    
    let jsondata = await getAudiofeatures(curr_url,access_token)
    //console.log(jsondata)
    let avg_value_dict = {}
    //points.push(jsondata["energy"])
    avg_value_dict["danceability"] = jsondata["danceability"] 
    avg_value_dict["acousticness"] = jsondata["acousticness"]
    avg_value_dict["duration"] = jsondata["duration_ms"]
    avg_value_dict["energy"] = jsondata["energy"]
    avg_value_dict["s_id"] = jsondata["id"]
    avg_value_dict["instrumentalness"] = jsondata["instrumentalness"]
    avg_value_dict["key"] = jsondata["key"]
    avg_value_dict["liveness"] = jsondata["liveness"]
    avg_value_dict["loudness"] = jsondata["loudness"]
    avg_value_dict["mode"] = jsondata["mode"]
    avg_value_dict["speechiness"] = jsondata["speechiness"]
    avg_value_dict["time_signature"] = jsondata["time_signature"]
    avg_value_dict["tempo"] = jsondata["tempo"]
    avg_value_dict["valence"] = jsondata["valence"]
    console.log("hello: "+avg_value_dict["tempo"])
    //console.log(avg_value_dict)
    for (const [key, value] of Object.entries(avg_value_dict)) {
        console.log(key, value);
      }
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
    let most_popid=jsondata["artists"][index_pop]["id"]
    enable_albumids(`https://api.spotify.com/v1/artists/${most_popid}/albums?include_groups=album&market=US&limit=3&offset=0`)
    
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
    //console.log("albumname "+ jsondata["items"][0]["name"])
    let items= jsondata["items"]
    //console.log(items[1]["name"])
    const album_ids = [];
    let albstr='';
    //console.log(items.length-1)
    //console.log("pop: " +  jsondata["artists"][0]["popularity"] + " name: " +  jsondata["artists"][0]["name"])
    for(let i=0; i<items.length; i++){
       album_ids.push(items[i]['name'])
       albstr=albstr+items[i]["id"]+'%2C'}
    //console.log(album_ids)
    albstr=albstr.slice(0, -3);
    console.log(albstr)
    
    let alburl=`https://api.spotify.com/v1/albums?ids=${albstr}&market=US`


    //https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc&market=US


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
    let trkstr='';
    //console.log(alb)
    const track_enclose_ids = [];
    for(let i=0; i<alb.length; i++){
         track_enclose_ids.push(alb[i]["tracks"]["items"])

      }
    const track_ids = []; 
    const track_names =[];  
    //console.log(track_enclose_ids) 
   
    console.log(track_enclose_ids[2].length) 
    for(let x=0; x<track_enclose_ids.length; x++){
        for(let y=0; y<track_enclose_ids[x].length;y++){
            track_ids.push(track_enclose_ids[x][y]["id"])
            track_names.push(track_enclose_ids[x][y]["name"])
        }

     }
     console.log(track_names)
     console.log(track_ids)
    //return avg_value_dict

    for(let i=0; i<track_ids.length; i++){
        
        trkstr=trkstr+track_ids[i]+'%2C'
    }
    
        trkstr=trkstr.slice(0, -3);
        console.log(trkstr);
     
     let trkurl=`https://api.spotify.com/v1/audio-features?ids=${trkstr}`;

     enable_track_audio(trkurl);
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

async function enable_track_audio(trkurl)
{
    let jsonData=await get_track_audio(trkurl,access_token);
    let all=jsonData["audio_features"];
    console.log(all);

    //Sum Variables
    let sum_acousticness=0;
    let sum_danceability=0;
    let sum_duration_ms=0;
    let sum_energy=0;
    let sum_instrumentalness=0;
    let sum_liveness=0;
    let sum_loudness=0;
    let sum_speechiness=0;
    let sum_tempo=0;
    let sum_valence=0;

    //Avg Variables

    let avg_acousticness=0;
    let avg_danceability=0;
    let avg_duration_ms=0;
    let avg_energy=0;
    let avg_instrumentalness=0;
    let avg_liveness=0;
    let avg_loudness=0;
    let avg_speechiness=0;
    let avg_tempo=0;
    let avg_valence=0;
    let i;
    
    for(i=0;i<all.length;i++)
    {
        sum_acousticness=sum_acousticness+all[i]["acousticness"];

        sum_danceability=sum_danceability+all[i]["danceability"];

        sum_duration_ms=sum_duration_ms+all[i]["duration_ms"];

        sum_energy=sum_energy+all[i]["energy"];

        sum_instrumentalness=sum_instrumentalness+all[i]["instrumentalness"];

        sum_liveness=sum_liveness+all[i]["liveness"];

        sum_loudness=sum_loudness+all[i]["loudness"];

        sum_speechiness=sum_speechiness+all[i]["speechiness"];

        sum_tempo=sum_tempo+all[i]["tempo"];

        sum_valence=sum_valence+all[i]["valence"];
        
    }

    avg_acousticness=sum_acousticness/all.length;

    avg_danceability=sum_danceability/all.length;

    avg_duration_ms=sum_duration_ms/all.length;

    avg_energy=sum_energy/all.length;

    avg_instrumentalness=sum_instrumentalness/all.length;

    avg_liveness=sum_liveness/all.length;

    avg_loudness=sum_loudness/all.length;

    avg_speechiness=sum_speechiness/all.length;

    avg_tempo=sum_tempo/all.length;

    avg_valence=sum_valence/all.length;

    //Dictionary Creation    
     let avg_value_dict = {}
   
    avg_value_dict["danceability"] = avg_danceability;

    avg_value_dict["acousticness"] = avg_acousticness;

    avg_value_dict["duration"] = avg_duration_ms;

    avg_value_dict["energy"] = avg_energy;
    
    avg_value_dict["instrumentalness"] =avg_instrumentalness;
   
    avg_value_dict["liveness"] = avg_liveness;

    avg_value_dict["loudness"] = avg_loudness;

    
    avg_value_dict["speechiness"] = avg_speechiness;

    avg_value_dict["tempo"] = avg_tempo;

    avg_value_dict["valence"] = avg_valence;
    console.log(avg_value_dict);
    
}











enable_curr_audio();
enable_track_pop();
//console.log(avg_value_dict["tempo"])
//console.log(points)

