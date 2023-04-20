// Add a global variables to store map, legend, circlMarkers so they dont duplicate on screen.
let map;
let circleMarkers = L.layerGroup();
let legend; 

// Create descriptions
const efDescriptions = [
  'EF0 (65–85 mph): Light damage',
  'EF1 (86–110 mph): Moderate damage',
  'EF2 (111–135 mph): Considerable damage',
  'EF3 (136–165 mph): Severe damage',
  'EF4 (166–200 mph): Devastating damage',
  'EF5 (>200 mph): Incredible damage',
];

// Colors based on mag
function getColor(mag) {
  return mag === 0 ? '#ffa600' :
         mag === 1 ? '#f18e06' :
         mag === 2 ? '#e4750a' :
         mag === 3 ? '#d65c0d' :
         mag === 4 ? '#c83f0d' :
                     '#bf000b';
}

// Make a legend controler
L.Control.Legend = L.Control.extend({
  onAdd: function() {
    const div = L.DomUtil.create('div', 'info legend');
    this.update(div);
    return div;
  },

  update: function(div) {
    div.innerHTML = '<h4>Tornado EF Scale:</h4>';
  
    for (let i = 0; i < efDescriptions.length; i++) {
      const mag = i;
      const color = getColor(mag);
      div.innerHTML += `<i style="background:${color}; width: 10px; height: 10px; display: inline-block;"></i> ${efDescriptions[i]}<br>`;
    }
  },
});

// Display map/Clear map
function displayMap(slonSlatData) {
  if (circleMarkers) {
    circleMarkers.clearLayers();
  }
  circleMarkers = L.layerGroup();
  
  // centre on the US
  if (!map) {
    map = L.map('Mapit').setView([40, -100], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }

  // Sort slonSlatData by mag in descending order
  slonSlatData.sort((a, b) => b.mag - a.mag);
  
  // Use similar method as from class to make the markers.
  slonSlatData.forEach(row => {
    const mag = parseInt(row.mag);
    const color = getColor(mag);
    const marker = L.circleMarker([row.slat, row.slon], {
      color: color,
      fillColor: color,
      fillOpacity: 0.45,
      radius: 5
    });

    marker.bindPopup(`EF Scale: ${mag}`);
    circleMarkers.addLayer(marker);
  });

  // Add the markers to the map.
  circleMarkers.addTo(map);

  // Only create the legend if it doesn't exist yet
  if (!legend) {
    legend = new L.Control.Legend({ position: 'bottomright' });
    legend.addTo(map);
  }
};