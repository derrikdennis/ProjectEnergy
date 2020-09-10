console.log("js is loaded")
let consumptionData;
d3.json("/electricity").then(data=>{
    consumptionData=data;
    console.log(consumptionData)
   init() 
})

function onChange(newState){
    graph(newState)
}

function init(){
    const selector = d3.select("#states")
const states = Object.keys(consumptionData.Coal)
    states.forEach(state=>{
        selector
        .append("option")
        .text(state);
    })
    graph(states[0])
}

function graph(state){
    var xValue = Object.keys(consumptionData);

var yValue = [];

for(const key in consumptionData){
    const val=consumptionData[key][state]
    yValue.push(val)
}


var trace1 = {
  x: xValue,
  y: yValue,
  type: 'bar',
  text: yValue.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  opacity: 0.5,
  marker: {
    color: 'rgb(158,202,225)',
    line: {
      color: 'rgb(8,48,107)',
      width: 1.5
    }
  }
};


var data = [trace1];

var layout = {
  title: `Energy Consumption ${state}`
};

Plotly.newPlot('graph', data, layout);
}