//Access electrical consumption data
d3.json('/electricity').then(data=>{
    energy_type = Object.keys(data)
    energy_values = Object.values(data)
    console.log(energy_type)
    console.log(energy_values)
    
    x_coal = Object.keys(energy_values[0])
    y_coal = Object.values(energy_values[0])
    x_gas = Object.keys(energy_values[1])
    y_gas = Object.values(energy_values[1])
    x_pet = Object.keys(energy_values[2])
    y_pet = Object.values(energy_values[2])
    x_ren = Object.keys(energy_values[3])
    y_ren = Object.values(energy_values[3])
    x_nuc = Object.keys(energy_values[4])
    y_nuc = Object.values(energy_values[4])
    
    var trace1 = {x: x_coal,y: y_coal,name: 'Coal',type: 'bar'};
    var trace2 = {x: x_gas,y: y_gas,name: 'Natural Gas',type: 'bar'};
    var trace3 = {x: x_pet,y: y_pet,name: 'Petroleum',type: 'bar'};
    var trace4 = {x: x_ren,y: y_ren,name: 'Renewable Energy',type: 'bar'};
    var trace5 = {x: x_nuc,y: y_nuc,name: 'Nuclear Power',type: 'bar'};

    var data = [trace1, trace2,trace3, trace4, trace5];

    var layout = {title: "Electrical Energy Consumption in 2018",xaxis: {title: 'State'},yaxis:{title:'Percent of Energy Source Consumed (%)'},barmode: 'stack'};
    
    //Access HTMl with elec div
    Plotly.newPlot('elec', data, layout);
});

