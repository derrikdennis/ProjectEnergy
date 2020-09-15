console.log("js is loaded")
let consumptionData;
let electricConsumption;
d3.json("/user").then(data => {
    d3.json("/electricity").then(response => {
        consumptionData = data;
        console.log(consumptionData)
        electricConsumption = response
        init()
    })
})

function onChange(newState) {
    graph(newState)
}

function init() {
    const selector = d3.select("#states")
    const states = Object.keys(consumptionData.Coal)
    states.forEach(state => {
        selector
            .append("option")
            .text(state);
    })
    graph(states[0])
}

function graph(state) {
    var xValue = Object.keys(consumptionData);
    var xEl = Object.keys(electricConsumption);
    var yValue = [];

    for (const key in consumptionData) {
        const val = consumptionData[key][state]
        yValue.push(val)
    }
    var yValue2 = [];

    for (const key in electricConsumption) {
        const val = electricConsumption[key][state]
        yValue2.push(val)
    }

    var trace1 = {
        x: xValue,
        y: yValue,
        name: 'End User',
        type: 'bar',
        text: yValue.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        opacity: 1.0,
        marker: {
            color: 'rgb(58,200,225)',
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };
    var trace2 = {
        x: xEl,
        y: yValue2,
        name: 'Electrical',
        type: 'bar',
        text: yValue2.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        opacity: 1.0,
        marker: {
            color: 'rgb(158,202,225)',
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };

    var data = [trace1, trace2];

    var layout = {
        title: `End User vs. Electrical Consumption ${state}`,
        yaxis: {
            title: 'Percent of Energy Source Consumed (%)'
        },
        xaxis: {
            title: 'Type of Energy'
        },
    };

    Plotly.newPlot('graph', data, layout);
}