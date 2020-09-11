const myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
});

const streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/outdoors-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

var link = "static/data/gz_2010_us_040_00_20m.json";


d3.json(link).then(function (data) {
    console.log(data)
    var geojson = L.choropleth(data, {
        valueProperty: "VALUE",
        scale: ["#FEFDFA", "#0957CC"],
        steps: 10,
        mode: "q",
        style: {
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
        },
        onEachFeature: function (features, layer) {
            layer.bindPopup("<h2>" + features.properties.STATE + "</h2>" + "<h3> Price of Energy: " + features.properties.VALUE + "¢</h3>");
        }
    }).addTo(myMap);

    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        var limits = geojson.options.limits;
        var colors = geojson.options.colors;
        var labels = [];


        div.innerHTML = "<h2>Price of Energy - 2019</h2>" + 'Cents per Kilowatt/Hour' +
            '<div class="labels"><div class="min">' + limits[0] + '¢' + '</div> \
         <div class="max">' + limits[limits.length - 1] + '¢' + '</div></div>';

        limits.forEach(function (limit, index) {
            labels.push('<li style="background-color: ' + colors[index] + '"></li>');
        })

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    }

    legend.addTo(myMap);
})