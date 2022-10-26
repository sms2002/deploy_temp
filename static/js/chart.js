const labels = [
  'Acousticness',
  'Danceability',
  'Energy',
  'Instrumentalness',
  'Liveness',
  'Speechiness',
  'Valence',
];

let temp_RR = [];

for(let i=0; i<labels.length; i++){
  console.log(labels[i])
  temp_RR[i] = localStorage.getItem(`${labels[i]}`.toLowerCase()) * 100;
}

console.log(temp_RR)

setTimeout(()=>{
  let result = localStorage.getItem('IMGcolor').slice(5, -1).split(',');
  if(result[0]>220){
    result[0] = result[0] - 40;
  }
  if(result[1]>220){
    result[1] = result[0] - 40;
  }
  if(result[1]>220){
    result[1] = result[0] - 40;
  }
  console.log(result)

  var data = {
    labels: labels,
    datasets: [{
      axis: 'y',
      label: 'Value %',
      data: temp_RR,
      fill: false,
      backgroundColor: [
        `rgba(${result[0]},${result[1]},${result[2]},0.6)`,
        `rgba(${result[0]},${result[1]},${result[2]},0.6)`,
        `rgba(${result[0]},${result[1]},${result[2]},0.6)`,
        `rgba(${result[0]},${result[1]},${result[2]},0.6)`,
        `rgba(${result[0]},${result[1]},${result[2]},0.6)`,
        `rgba(${result[0]},${result[1]},${result[2]},0.6)`,
        `rgba(${result[0]},${result[1]},${result[2]},0.6)`,
      ],
      borderColor: [
        `rgb(${result[0]},${result[1]},${result[2]})`,
        `rgb(${result[0]},${result[1]},${result[2]})`,
        `rgb(${result[0]},${result[1]},${result[2]})`,
        `rgb(${result[0]},${result[1]},${result[2]})`,
        `rgb(${result[0]},${result[1]},${result[2]})`,
        `rgb(${result[0]},${result[1]},${result[2]})`,
        `rgb(${result[0]},${result[1]},${result[2]})`,
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data,
    plugins: [ChartDeferred],
    options: {
      indexAxis: 'y',
      animation: {
        duration: 4000,
      },
      plugins: {
        deferred: {
          xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
          yOffset: '55%', // defer until 50% of the canvas height are inside the viewport
          delay: 300      // delay of 500 ms after the canvas is considered inside the viewport
        }
      }
    }
  };

  const myChart = new Chart(
    document.getElementById('chartID'),
    config
  );
},1000);
