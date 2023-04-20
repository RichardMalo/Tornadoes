// declate the variable myMap otherwise it wont load.
let myMap;

// Initialize the map with 1950 data
function initMap() {
  loadData().then(function (data) {
    // Filter data for the year 1950
    const filteredData = data.filter(row => row.yr === '1950');
    // Create the map with the filtered data
    createMap(filteredData);
  });
}

// Create a map with the given data
function createMap(data) {
  // Create a Leaflet map centered on the United States
  if (!myMap) {
    myMap = L.map('Mapit').setView([40, 100], 4);

    // Add a tile layer (base map) to the Leaflet map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  } else {
    // Remove any existing markers from the map
    myMap.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        myMap.removeLayer(layer);
      }
    });
  }

  // Plot tornado locations on the map for the selected year
  data.forEach(row => {
    L.marker([row.slat, row.slon]).addTo(myMap);
  });
}

// Initiate this baby!
initMap();
