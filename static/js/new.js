// //need to handle expiring access_token
// refreshAccessToken()
access_token = window.sessionStorage.getItem('access_token');

let artistidsx = {}
let artistnamesx={}
const songx_ids=[]
const songx_names=[]
const songx_albPop=[]
const songx_explicit=[]
const songx_trkURL=[]



async function newReleases(url){
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

async function enable_newReleases(){
    let albumstring=''
    const songimgs=[]
    let offset = 0;
    let limit = 12;
    let market = 'US';
    let url = `https://api.spotify.com/v1/browse/new-releases?country=${market}&limit=${limit}&offset=${offset}`;
    let resp = await newReleases(url);

    // console.log(resp)

    let albums = resp['albums']
    // console.log(albums)
    let items = albums['items']
    // console.log(items)
    for(let i=0;i<items.length;i++){
         albumstring=albumstring+items[i]["id"]+'%2C'
         songimgs.push(items[i]["images"][1]["url"])
    }
    // console.log(albumstring)
    albumstring=albumstring.slice(0, -3);
    // console.log(albumstring)
    
    let albumurl=`https://api.spotify.com/v1/albums?ids=${albumstring}&market=US`
    // console.log(albumurl)

    //https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc&market=US


    enablex_trackids(albumurl,songimgs)
}


async function getx_trackids(url,access_token) {
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

async function enablex_trackids(albumurl,songimgs) {
   
    let artist_string=''
    let artist_name_string=''
    let jsondata = await getx_trackids(albumurl,access_token)  
    console.log(jsondata)

    

    // console.log(jsondata["albums"][0]["tracks"]["items"][12]) 
    for(let i=0;i<jsondata["albums"].length;i++){
        let tempLEN = jsondata["albums"][i]["tracks"]["items"].length - 1;
        songx_ids.push(jsondata["albums"][i]["tracks"]["items"][tempLEN]["id"])
        songx_names.push(jsondata["albums"][i]["tracks"]["items"][tempLEN]["name"])
        songx_albPop.push(jsondata["albums"][i]["popularity"])
        songx_explicit.push(jsondata["albums"][i]["tracks"]["items"][tempLEN]["explicit"])
        songx_trkURL.push(jsondata["albums"][i]["tracks"]["items"][tempLEN]["external_urls"]["spotify"])
    }
    // console.log(songx_ids)
    // console.log(songx_names)
    for(let i=0;i<jsondata["albums"].length;i++){
        let tempLEN = jsondata["albums"][i]["tracks"]["items"].length - 1;
        artist_string=''
        artist_name_string=''
        for(let j=0;j<jsondata["albums"][i]["tracks"]["items"][tempLEN]["artists"].length;j++){
            artist_string=artist_string+jsondata["albums"][i]["tracks"]["items"][tempLEN]["artists"][j]["id"]+","
            artist_name_string=artist_name_string+jsondata["albums"][i]["tracks"]["items"][tempLEN]["artists"][j]["name"]+", "
        }
        artistidsx[i]=artist_string.slice(0,-1)
        artistnamesx[i]=artist_name_string.slice(0,-2)
    }
    // console.log(artistidsx)
    // console.log(artistidsx[0])
    // console.log(artistnamesx)
    // console.log(songimgs)
    for(let iter=0; iter<12; iter++){
       
       
        let selector_id = `card${iter}`;
        var x = document.getElementById(`${selector_id}`);
        x.querySelector("h5").innerHTML = songx_names[iter];
        x.querySelector("p").innerHTML = artistnamesx[iter]
        x.querySelector("img").alt = songx_names[iter];
        x.querySelector("img").src = songimgs[iter];
        x.addEventListener("click",function(e){
            // alert("clicked");
            e.preventDefault();
            set_NEWvalue(iter);
            // inputTrack.value = songx_names[iter]
            //check this lineeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            
            // let uuu = `https://open.spotify.com/track/${songx_ids[iter]}`;
            // location.href = uuu;

            let webLink = `/audio?displayName=${songx_names[iter]}%20-%20${artistnamesx[iter]}&trkID=${songx_ids[iter]}&trkPop=${songx_albPop[iter]}`;
            location.href = webLink;

            enable_searchItem(items[iter]['name'])
            console.log('a')
            console.log(search_trackNames)

            // let resolved_id = resolve_searchID(items[iter]['name'])
            resolved_id = 0;
            console.log('b')
            console.log(search_trackIDs)
            console.log(search_trackIDs[0])
            set_value(0)

            
        })
        // x.querySelector("a").target = "_blank"; 

    } 
    
    //return avg_value_dict

}

function set_NEWvalue(resolved_id){
    localStorage.setItem('trackDisplayName',`${songx_names[resolved_id]} - ${artistnamesx[resolved_id]}`)
    localStorage.setItem('trackID',songx_ids[resolved_id])
    localStorage.setItem('artistIDs',artistidsx[resolved_id])
    localStorage.setItem('trackExplicit',songx_explicit[resolved_id])
    // localStorage.setItem('trackReleaseDate',search_ReleaseDate[resolved_id])

    // localStorage.setItem('trackPopularity',songx_albPop[resolved_id])
    //temporarily giving album pop as trk pop

    localStorage.setItem('trackUrl',songx_trkURL[resolved_id])    

    // let route_pass = search_trackIDs[resolved_id] + ',' + search_trackNames[resolved_id] + ',' + search_trackPopularity[resolved_id]
    // localStorage.setItem('routePass',route_pass)
        
}

























