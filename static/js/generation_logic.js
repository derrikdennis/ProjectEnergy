//For the energy generation stacked bar graph
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset1");
  
  // Use the list of states to populate the select options
  d3.json("/states").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
      .append("option")
      .text(sample)
      .property("value", sample);
      });
  });
  //Use Alabama as default graph when opening page
  d3.json("/state_gen/AL").then(function(data){
     energy_source = Object.keys(data)
     energy_data = Object.values(data)
     
     x_val = Object.keys(energy_data[0])
     console.log(x_val)
     y_nat = Object.values(energy_data[0])
     y_coal = Object.values(energy_data[1]) 
     y_pl = Object.values(energy_data[2])
     y_pc = Object.values(energy_data[3])
     y_og = Object.values(energy_data[4])
     y_nuc = Object.values(energy_data[5])
     y_hy = Object.values(energy_data[6])
     y_w = Object.values(energy_data[7])
     y_wood = Object.values(energy_data[8])
     y_bio = Object.values(energy_data[9])
      
     var trace1 = {x: x_val,y:y_nat,type: 'scatter',name: "Natural Gas"};
     var trace2 = {x: x_val,y:y_coal,type: 'scatter',name: "Coal"};
     var trace3 = {x: x_val,y:y_pl,type: 'scatter',name: "Petroleum Liquids"};
     var trace4 = {x: x_val,y:y_pc,type: 'scatter',name: "Petroleum Coke"};
     var trace5 = {x: x_val,y:y_og,type: 'scatter',name: "Other Gases"};
     var trace6 = {x: x_val,y:y_nuc,type: 'scatter',name: "Nuclear"};
     var trace7 = {x: x_val,y:y_hy,type: 'scatter',name: "Hydroelectric"};
     var trace8 = {x: x_val,y:y_w,type: 'scatter',name: "Wind"};
     var trace9 = {x: x_val,y:y_wood,type: 'scatter',name: "Wood"};
     var trace10 = {x: x_val,y:y_bio,type: 'scatter',name: "Other Biomass"};
     var data = [trace1,trace2,trace3,trace4,trace5,trace6,trace7,trace8,trace9,trace10]
     
     var layout = {title: "Average Yearly Energy Generation in AL",xaxis: {title: 'Year'},yaxis:{title:'Yearly Energy Generation (MMWH)'}};
      
     Plotly.newPlot('gen', data,layout);   
    });
  }
init();

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset1").on("change", updatePlotly);
// This function is called when a dropdown menu item is selected
function updatePlotly(){
    var dropdownMenu = d3.select("#selDataset1");
    // Assign the value of the dropdown menu option to a variable
    var sample = String(dropdownMenu.property("value"));
    //Access sqlite database based on which state was selected from dropdown
    d3.json('/state_gen/'+sample).then(data=>{
     energy_source = Object.keys(data)
     energy_data = Object.values(data)
     
     x_val = Object.keys(energy_data[0])
     y_nat = Object.values(energy_data[0])
     y_coal = Object.values(energy_data[1]) 
     y_pl = Object.values(energy_data[2])
     y_pc = Object.values(energy_data[3])
     y_og = Object.values(energy_data[4])
     y_nuc = Object.values(energy_data[5])
     y_hy = Object.values(energy_data[6])
     y_w = Object.values(energy_data[7])
     y_wood = Object.values(energy_data[8])
     y_bio = Object.values(energy_data[9])
      
     Plotly.restyle("gen", "x", [x_val]);
     Plotly.restyle("gen", "y", [y_nat,y_coal,y_pl,y_pc,y_og,y_nuc,y_hy,y_w,y_wood,y_bio]);
        
      var update = {
        title: 'Average Yearly Energy Generation in '+sample // updates the title
      };
      Plotly.relayout(gen, update)
  });
};
