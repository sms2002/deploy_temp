
access_token = window.sessionStorage.getItem('access_token');

let TRACK_ID = localStorage.getItem('trackID')
let ARTIST_IDS_t = localStorage.getItem('artistIDs')

const ARTIST_IDS = ARTIST_IDS_t.split(",");

console.log(TRACK_ID)
console.log(ARTIST_IDS)

let ARTSTR='';
for(let i=0; i<ARTIST_IDS.length; i++){
    ARTSTR=ARTSTR+ARTIST_IDS[i]+'%2C'
}
ARTSTR=ARTSTR.slice(0, -3);
// console.log(ARTSTR)
    

let art_names = {}
let art_ids = {}
let art_names_str=''
let art_ids_str=''

const s_ids=[]
const s_pop=[]
const s_name=[]
const s_explicit=[]
const s_trkURL=[]
const imgs=[]

let ARTIST_URL = `https://api.spotify.com/v1/artists?ids=${ARTSTR}`

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
    
    let jsondata = await gettrackpop(ARTIST_URL,access_token)
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
    // console.log("pop: " +  jsondata["artists"][index_pop]["popularity"] + " name: " +  jsondata["artists"][index_pop]["name"] + " id: " + jsondata["artists"][index_pop]["id"])
    let most_popid=jsondata["artists"][index_pop]["id"]
    // enable_albumids(`https://api.spotify.com/v1/artists/${most_popid}/albums?include_groups=album&market=US&limit=3&offset=0`)
    // console.log(most_popid)
    let genresLength = jsondata["artists"][index_pop]["genres"].length;

    // console.log(genresLength);
    if(genresLength>3){
        genresLength=3;
    }
    let genresStr='';
    for(let i=0;i<genresLength;i++)
    {
        genresStr=genresStr+jsondata["artists"][index_pop]["genres"][i]+'%2C';
    }
    genresStr=genresStr.slice(0, -3);
    
    genresStr= genresStr.replaceAll(' ','%20');
    // console.log(genresStr);
    let suggestionUrl=`https://api.spotify.com/v1/recommendations?limit=6&market=US&seed_artists=${most_popid}&seed_genres=${genresStr}&seed_tracks=${TRACK_ID}`
    // console.log(suggestionUrl)
    enable_suggestions(suggestionUrl);
}

async function getSuggestions(url,access_token) {
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

async function enable_suggestions(suggestionUrl)
{
    let jsondata = await getSuggestions(suggestionUrl,access_token)
    // console.log(jsondata)
    

    
    let tracks = jsondata["tracks"]
    for(let i=0;i<tracks.length;i++){
        s_name.push(tracks[i]["name"])
        s_pop.push(tracks[i]["popularity"])
        s_ids.push(tracks[i]["id"])
        s_trkURL.push(tracks[i]["external_urls"]["spotify"])
        s_explicit.push(tracks[i]["explicit"])
        imgs.push(tracks[i]["album"]["images"][1]["url"])
    }
    for(let i=0;i<tracks.length;i++){
        art_names_str=''
        art_ids_str=''
        for(let j=0;j<tracks[i]["album"]["artists"].length;j++){
            art_names_str=art_names_str+tracks[i]["album"]["artists"][j]["name"]+","
            art_ids_str=art_ids_str+tracks[i]["album"]["artists"][j]["id"]+","
        }
        art_names[i]= art_names_str.slice(0,-1)
        art_ids[i]= art_ids_str.slice(0,-1)
    }
    // console.log(s_ids)
    // console.log(s_name)
    // console.log(imgs)
    // console.log(art_names)
    // console.log(art_ids)
   
    for( let i=0;i<6;i++)
    {
        // console.log(art_names[i]);
    }
    /*for (const [key, value] of Object.entries(art_names)) {
        console.log(key, value);
      }
      for (const [key, value] of Object.entries(art_ids)) {
        console.log(key, value);
      }  */
      for(let iter=0; iter<6; iter++){
       
       
        let selector_id = `card${iter}`;
        var x = document.getElementById(`${selector_id}`);
        x.querySelector("h5").innerHTML = s_name[iter];
        x.querySelector("p").innerHTML = art_names[iter]
        x.querySelector("img").src = imgs[iter];
        x.querySelector("img").alt = s_name[iter];
        x.addEventListener("click",function(e){
            // alert("clicked");
            e.preventDefault();
            set_NEWvalue(iter);
            // inputTrack.value = songx_names[iter]
            //check this lineeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            
            // let uuu = `https://open.spotify.com/track/${songx_ids[iter]}`;
            // location.href = uuu;

            let webLink = `/audio?displayName=${s_name[iter]}%20-%20${art_names[iter]}&trkID=${s_ids[iter]}&trkPop=${s_pop[iter]}`;
            location.href = webLink;
        })
      }
}
enable_track_pop();

function set_NEWvalue(resolved_id){
    // console.log(`${s_name[resolved_id]} - ${art_names[resolved_id]}`)
    // console.log(s_ids[resolved_id])
    // console.log(art_ids[resolved_id])
    // console.log(s_explicit[resolved_id])
    // console.log(s_trkURL[resolved_id])
    // console.log('-----------------------------------------------------------')
    localStorage.setItem('trackDisplayName',`${s_name[resolved_id]} - ${art_names[resolved_id]}`)
    localStorage.setItem('trackID',s_ids[resolved_id])
    localStorage.setItem('artistIDs',art_ids[resolved_id])
    localStorage.setItem('trackExplicit',s_explicit[resolved_id])
    // localStorage.setItem('trackReleaseDate',search_ReleaseDate[resolved_id])

    // localStorage.setItem('trackPopularity',songx_albPop[resolved_id])
    //trk pop over here

    localStorage.setItem('trackUrl',s_trkURL[resolved_id])    

    // let route_pass = search_trackIDs[resolved_id] + ',' + search_trackNames[resolved_id] + ',' + search_trackPopularity[resolved_id]
    // localStorage.setItem('routePass',route_pass)
        
}