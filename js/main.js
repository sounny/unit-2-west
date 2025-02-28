//Ethan Westerkamp

//declare map var in global scope
var map;
<<<<<<< Updated upstream
var minValue;
=======
var dataStats = {};
var minValue;
var ScaleControl
>>>>>>> Stashed changes
//function to instantiate the Leaflet map
function createMap(){
    //create the map
    map = L.map('map', {
        center: [40, -97],
<<<<<<< Updated upstream
        zoom: 4.49
=======
        zoom: 4
>>>>>>> Stashed changes
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    //call getData function
    getData(map);
};

<<<<<<< Updated upstream
function createSequenceControls(attributes){
    //create range input element (slider)
    var slider = "<input class='range-slider' type='range'></input>";
    document.querySelector("#panel").insertAdjacentHTML('beforeend', slider);
    
    //set slider attributes
=======
function createScale(){
    ScaleControl = L.control.scale({
        options:{
            maxWidth: 50,
            position: 'bottomleft',
            metric : true,
            imperial: true,
        },
    }).addTo(map)
};

function createSequenceControls(attributes){   
    var SequenceControl = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function () {
            // create the control container div with a particular class name
            var container = L.DomUtil.create('div', 'sequence-control-container');

            // ... initialize other DOM elements
            container.insertAdjacentHTML('beforeend', '<input class="range-slider" type="range">')

            //add skip buttons
            container.insertAdjacentHTML('beforeend', '<button class="step" id="reverse" title="Reverse"><img src="img/reverse.png"></button>'); 
            container.insertAdjacentHTML('beforeend', '<button class="step" id="forward" title="Forward"><img src="img/forward.png"></button>');

            L.DomEvent.disableClickPropagation(container);
            return container;
        }

    });

    map.addControl(new SequenceControl());    // add listeners after adding control}
>>>>>>> Stashed changes
    document.querySelector(".range-slider").max = 24;
    document.querySelector(".range-slider").min = 0;
    document.querySelector(".range-slider").value = 0;
    document.querySelector(".range-slider").step = 1;
<<<<<<< Updated upstream
    document.querySelector('#panel').insertAdjacentHTML('beforeend','<button class="step" id="reverse">Reverse</button>');
    document.querySelector('#panel').insertAdjacentHTML('beforeend','<button class="step" id="forward">Forward</button>');
    document.querySelector('#reverse').insertAdjacentHTML('beforeend',"<img src='img/reverse.png'>")
    document.querySelector('#forward').insertAdjacentHTML('beforeend',"<img src='img/forward.png'>")
=======
>>>>>>> Stashed changes
    document.querySelector('.range-slider').addEventListener('input', function(){
        //Step 6: get the new index value
        var index = this.value;
        console.log(index)
        updatePropSymbols(attributes[index]);
    });
    document.querySelectorAll('.step').forEach(function(step){
        step.addEventListener("click", function(){
            var index = document.querySelector('.range-slider').value;

            //Step 6: increment or decrement depending on button clicked
            if (step.id == 'forward'){
                index++;
                //Step 7: if past the last attribute, wrap around to first attribute
                index = index > 24 ? 0 : index;
            } else if (step.id == 'reverse'){
                index--;
                //Step 7: if past the first attribute, wrap around to last attribute
                index = index < 0 ? 24 : index;
            };

            //Step 8: update slider
            document.querySelector('.range-slider').value = index;
            updatePropSymbols(attributes[index]);
        })
    })
<<<<<<< Updated upstream
    
};

function updatePropSymbols(attribute){
    map.eachLayer(function(layer){
        if (layer.feature && layer.feature.properties[attribute]){
            //access feature properties
=======
}

function createLegend(){
    var LegendControl = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function () {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'legend-control-container');

            container.innerHTML = '<p class="temporalLegend">Weighted Annual Mean of PM2.5 in <span class="year">2000</span></p>';

            var svg = '<svg id="attribute-legend" width="160px" height="60px" float = "top">';

        //array of circle names to base loop on
            var circles = ["max", "mean", "min"]; 

            //Step 2: loop to add each circle and text to svg string  
            for (var i=0; i<circles.length; i++){

                //Step 3: assign the r and cy attributes            
                var radius = calcPropRadius(dataStats[circles[i]]);           
                var cy = 60 - radius;            
    
                //circle string            
                svg += '<circle class="legend-circle" id="' + circles[i] + '" r="' + radius + '"cy="' + cy + '" fill="#993b3b" fill-opacity="0.8" stroke="#000000" cx="30"/>';
    
                //evenly space out labels            
                var textY = i * 20 + 20;            
    
                //text string            
                svg += '<text id="' + circles[i] + '-text" x="65" y="' + textY + '">' + Math.round(dataStats[circles[i]]*100)/100 + " per µg/m3" + '</text>';
            };
    
            //close svg string
            svg += "</svg>";
    
            //add attribute legend svg to container
            container.insertAdjacentHTML('beforeend',svg);

            return container;
        }
    });

    map.addControl(new LegendControl());

}


function updatePropSymbols(attribute){
    var year = attribute.split("_")[1];
    document.querySelector("span.year").innerHTML = year;
    map.eachLayer(function(layer){
        if (layer.feature && layer.feature.properties[attribute]){
            //access feature properties
            
            
>>>>>>> Stashed changes
            var props = layer.feature.properties;

            //update each feature's radius based on new attribute values
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);

            //add city to popup content string
<<<<<<< Updated upstream
            var popupContent = "<p><b>City:</b> " + props["Core Based Statistical Area"] + "</p>";

            //add formatted attribute to panel content string
            var year = attribute.split("_")[1];
            popupContent += "<p><b>Weighted Annual Mean of PM2.5 in  " + year + ":</b> is " + props[attribute] + " per µg/m3</p>";

            //update popup content            
            popup = layer.getPopup();            
            popup.setContent(popupContent).update();
=======
            var popupContent = new PopupContent(props, attribute);

            //update popup with new content    
            popup = layer.getPopup();    
            popup.setContent(popupContent.formatted).update();
            
>>>>>>> Stashed changes
        };
    });
};

//function to convert markers to circle markers
function pointToLayer(feature, latlng, attributes){
    //Determine which attribute to visualize with proportional symbols
    var attribute = attributes[0];
    console.log(attribute)
    //create marker options
    var options = {
<<<<<<< Updated upstream
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
=======
        fillColor: "#993b3b",
        color: "#000",
        weight: 0,
        opacity: 1,
        fillOpacity: 0.6
>>>>>>> Stashed changes
    };

    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);

    //Give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadius(attValue);

    //create circle marker layer
    var layer = L.circleMarker(latlng, options);

    //build popup content string
<<<<<<< Updated upstream
    var popupContent = "<p><b>City:</b> " + feature.properties["Core Based Statistical Area"] + "</p>";
    var year = attribute.split("_")[1];
    popupContent += "<p><b>Weighted Annual Mean of PM2.5 in  " + year + ":</b> is " + feature.properties[attribute] + " per µg/m3</p>";
    //bind the popup to the circle marker
    layer.bindPopup(popupContent, {
        offset: new L.Point(0,-options.radius) 
=======
    var popupContent = new PopupContent(feature.properties, attribute);

    //bind the popup to the circle marker    
    layer.bindPopup(popupContent.formatted, { 
        offset: new L.Point(0,-options.radius)
>>>>>>> Stashed changes
    });

    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
};



<<<<<<< Updated upstream
=======

function PopupContent(properties, attribute){
    this.properties = properties;
    this.attribute = attribute;
    this.year = attribute.split("_")[1];
    this.anmean = this.properties[attribute];
    this.formatted = "<p><b>City:</b> " + this.properties["Core Based Statistical Area"] + "</p><p><b>Weighted Annual Mean of PM2.5 in  " + this.year + ":</b> is " + this.anmean + " per µg/m3</p>";
};



>>>>>>> Stashed changes
function calculateMinValue(data){
    //create empty array to store all data values
    var allValues = [];
    //loop through each city
    for(var city of data.features){
        //loop through each year
        for(var year = 2000; year <= 2023; year++){
              //get population for current year
              var value = city.properties["Pop_"+ String(year)];
              //add value to array
              allValues.push(value);
        }
    }
    //get minimum value of our array
    var minValue = Math.min(...allValues)

    return minValue;
}

function calcPropRadius(attValue) {
    //constant factor adjusts symbol sizes evenly
    var minRadius = 10;
    //Flannery Apperance Compensation formula
    var radius = 1.0083 * Math.pow(attValue/minValue,.85) * minRadius

    return radius;
};


//Add circle markers for point features to the map
function createPropSymbols(data, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};

function processData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with population values
        if (attribute.indexOf("Pop") > -1){
            attributes.push(attribute);
        };
    };

    //check result
    console.log(attributes);

    return attributes;
};

<<<<<<< Updated upstream
=======
function calcStats(data){
    //create empty array to store all data values
    var allValues = [];
    //loop through each city
    for(var city of data.features){
        //loop through each year
        for(var year = 2000; year <= 2023; year++){
              //get population for current year
              var value = city.properties["Pop_"+ String(year)];
              //add value to array
              allValues.push(value);
        }
    }
    //get min, max, mean stats for our array
    dataStats.min = Math.min(...allValues);
    dataStats.max = Math.max(...allValues);
    //calculate meanValue
    var sum = allValues.reduce(function(a, b){return a+b;});
    dataStats.mean = sum/ allValues.length;

}    


>>>>>>> Stashed changes
//Step 2: Import GeoJSON data
function getData(){
    //load the data
    fetch("data/USCitiesAP.geojson")
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //calculate minimum data value
<<<<<<< Updated upstream
            var attributes = processData(json);
            minValue = calculateMinValue(json);
            //call function to create proportional symbols
            createPropSymbols(json, attributes);
            createSequenceControls(attributes);
=======
           
            var attributes = processData(json);
            minValue = calculateMinValue(json);
            calcStats(json);
            //call function to create proportional symbols
            
            createPropSymbols(json, attributes);
            createSequenceControls(attributes);
            createLegend(attributes);
            createScale();
            
>>>>>>> Stashed changes
        })
};
document.addEventListener('DOMContentLoaded',createMap)