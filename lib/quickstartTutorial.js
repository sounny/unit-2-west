//Ethan Westerkamp

var map = L.map('map').setView([51.505, -0.09], 13);  //makes the map var and uses the setView method to put the view over London

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { //takes the openmap tileset for the area of the slippy map seen
    maxZoom: 19, //sets max zoom (higher is more zoom)
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' //copyright attribution
}).addTo(map); //adds to the var map

var marker = L.marker([51.5, -0.09]).addTo(map); //puts the marker at the specified coords

var circle = L.circle([51.508, -0.11], { //puts a circle at the coords 
    color: 'red', //color of the edge
    fillColor: '#f03', //color of the fill
    fillOpacity: 0.5, //opacity
    radius: 500 //size in meters
}).addTo(map);

var polygon = L.polygon([ //sets a triangle at the coords
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup(); //puts these strings as popups on the associated variables
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup() //standalone popup at the coords
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map); //specifies that the popup is open already

function onMapClick(e) {
    popup
        .setLatLng(e.latlng) //takes the empty variable e set to the point clicked 
        .setContent("You clicked the map at " + e.latlng.toString()) //makes the variable a string
        .openOn(map);
}

map.on('click', onMapClick);