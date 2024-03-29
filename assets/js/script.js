
const inputField = document.getElementById('ip-input');
const button = document.getElementById('search-btn');

// LEAFLET API
// CREATING THE MAP
const myMap = L.map('map').setView([44, 22], 4);
// ADDING A MARKER
const marker = L.marker([40, -29]).addTo(myMap);

// ADDING TILES
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGF1bHJveWNlMzAiLCJhIjoiY2t5enV4d2p2MDhqYzJ2cWFnejZwazZyNiJ9.5xXLILTIgek2Sg3qZcTajw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(myMap);

// TO LOAD THE USER POSITION WHEN THE PAGE HAS FINISHED LOADING
window.onload = () => {
    execute();
}

button.addEventListener("click", execute)
function execute() {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_u4P1ityJ0kabWrEkYcbvAPnOVpJQY&domain=${inputField.value}`)
        .then(response => response.json())
        .then(result => {
             document.getElementById('ip-address-results').textContent = result.ip;
             document.getElementById('location-results').textContent = result.location.country;
             document.getElementById('utc-results').textContent = result.location.timezone;
             document.getElementById('isp-results').textContent = result.isp;
             marker.setLatLng([result.location.lat, result.location.lng])
             myMap.setView([result.location.lat, result.location.lng], 8);
             inputField.value = '';
        })
        .catch(err => {
            console.log(err.message);
            alert('something went wrong with the data');
        }) 
}

inputField.addEventListener('focus', function() { 
    this.classList.remove('error');
    button.classList.remove('error')
  });