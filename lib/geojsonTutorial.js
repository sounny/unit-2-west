//Ethan Westerkamp

var map = L.map('map').setView([45, -100], 5); //sets the map to view the US

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

var geojsonFeature = {
    "type": "Feature", //to align with the geojson format, sets it as a feature point 
    "properties": {
        "name": "Coors Field", //data to be included with the feature
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!" //adds property for popup
    },
    "geometry": {
        "type": "Point", //assigns the feature as a point with its coords
        "coordinates": [-104.99404, 39.75621]
    }
};

L.geoJSON(geojsonFeature).addTo(map); //adds the feature to the map

var myLines = [{ //sets these as a polyline at the coords
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

var myStyle = { //assigns the style to be called for myLines
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

L.geoJSON(myLines, {
    style: myStyle
}).addTo(map);

var myLayer = L.geoJSON().addTo(map); //emtpy layer as a geoJSON
myLayer.addData(geojsonFeature); //adds this to the map

var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},//data to be called in the switch statement later
    "geometry": {
        "type": "Polygon",//makes it a rectangle 
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",//same as above
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];

L.geoJSON(states, {
    style: function(feature) { //sets the style of the geojson to be set by the switch function assigning colors
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(map);

var geojsonMarkerOptions = {//makes a specific point markers assigning circle attributes
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

L.geoJSON(someGeojsonFeature, {//takes a feature var and a latlng var and makes the assigned points into a circle marker
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);

var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true //sets it to show on the map in the filter
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": false
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.98404, 39.74621]
    }
}];

L.geoJSON(someFeatures, {
    filter: function(feature, layer) { //takes each layer in the feature and returns it if it has the show_on_map property
        return feature.properties.show_on_map;
    }
}).addTo(map);