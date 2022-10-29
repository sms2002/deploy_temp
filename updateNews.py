import requests

api_key = "5ded574a864b45148274ffb0adc49f2c"

url = f'https://newsapi.org/v2/everything?q=music&domains=billboard.com&language=en&apiKey={api_key}'


def get_SeveralTracks():
  response = requests.get(url)
  resp = response.json()
  return resp

limit=9
x=get_SeveralTracks()
x=x["articles"][:limit]

st=""
dl="!@#$%"

for i in range(len(x)):
    st=st+x[i]["title"]+dl+x[i]["url"]+dl+x[i]["urlToImage"]+dl

st=st[:len(st)-5]

file1 = open("inputNews.txt","w")#write mode
file1.write(st)
file1.close()



