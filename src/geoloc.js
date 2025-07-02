var x = document.getElementById("demo");
const api_key = "AIzaSyAskW7ySpDl-QepAhesYZaLn1NLR1ySC34"
const base_url = "https://www.google.com/maps/embed/v1/view?key="+api_key//+"&q="+latlon
var allCoords=[];

console.log("loading geo_code")

export function geoTest(){
    getLocation()
}
export function geoTestStart(){
    setInterval(getLocation, 2000)
}
function displayEmbeddedMap(mapDOM, coords){

}

function printCoords(){
    var myCoordString=""
    allCoords.forEach(function(item){
        myCoordString+=item[0]+", "+item[1]+"<br>"
    })
    document.getElementById("coordBox").textContent=myCoordString;
}

export function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success function
            regPosition, 
            // Error function
            showError,
            // Options. See MDN for details.
            {
               enableHighAccuracy: true,
               timeout: 5000,
               maximumAge: 0
            });
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function regPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    console.log("test"+latlon)
    allCoords.push([position.latitude, position.longitude])
    printCoords();
    //var img_url = "https://www.google.com/maps/search/?api=1&query=55.0%2C10.0";id="coordbox"
    //document.getElementById("mapFrame").src=base_url+"&center="+latlon+"&zoom=18";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
