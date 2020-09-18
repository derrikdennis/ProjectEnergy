# ProjectEnergy
The purpose of this project was to look at energy consumption and generation in the US and try to understand the differences in energy prices accross the US. We first webscraped all of the data from eia.gov using python. We stored this data into a sqlite database. We then created a Flask app that with different routes that rendered the neccessary html documents and output different API's based on the data needed. We created all of the visualizations using Javascript, D3, Plotly, and Leaflet. Through the Flask app, we were able to read in the JSON data from the sqlite database directly. All of the graphs are interactive with hover elements and drop-downs. 

Our website can be viewed here: https://project-energy.herokuapp.com

Energy has always played an important role in defining the state of Texas. But how have other states compared? For our group project, we wanted to answer this question by looking at three key areas across all states: the production of energy, the consumption of energy, and the prices each state paid for that consumption.
