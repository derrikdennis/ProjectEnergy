function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
  d3.json("/states").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
      .append("option")
      .text(sample)
      .property("value", sample);
      });
  });
  
  d3.json("/state_price/AL").then(function(data){
     //console.log(data);
     x_val = Object.keys(data)
     y_val = Object.values(data)
      
     var trace = {
     x: x_val,
     y:y_val,
     type: 'scatter'
    };
      
     var data = [trace]
      
     Plotly.newPlot('myDiv', data);   
    });
  }
init();


// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);
// This function is called when a dropdown menu item is selected
function updatePlotly(){
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var sample = dropdownMenu.property("value");
    
    d3.json('/state_price/'+sample).then(data){
      
      x_val = Object.keys(data)
      y_val = Object.values(data)
      
      Plotly.restyle("myDiv", "x", [x_val]);
      Plotly.restyle("myDiv", "y", [y_val]);
  });
};

