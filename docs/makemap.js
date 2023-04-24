// Add a global variables to store map, legend, circlMarkers so they dont duplicate on screen.
let map;
let circleMarkers = L.layerGroup();
let legend; 
let layerControl;

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
    // Loop through the 6 descriptions to make the text
    for (let i = 0; i < efDescriptions.length; i++) {
      const mag = i;
      const color = getColor(mag);
      // Create a span element with the legend text and add click event listener
      const span = document.createElement('span');
      span.innerHTML = `<i style="background:${color}; width: 10px; height: 10px; display: inline-block;"></i> ${efDescriptions[i]}<br>`;
      span.onclick = () => {
        const layers = circleMarkers.getLayers();
        layers.forEach(layer => {
          // Check if the layer's mag matches the clicked item's mag
          if (parseInt(layer.feature.properties.mag) === mag) {
            if (span.classList.contains('selected')) {
              circleMarkers.addLayer(layer); // add layer back if selected
              span.classList.remove('selected');
            } else {
              circleMarkers.removeLayer(layer); // remove layer if not selected
              span.classList.add('selected');
            }
          }
        });
      };
      div.appendChild(span);
    }
  },
});

function displayMap(slonSlatData) {
  if (circleMarkers) {
    circleMarkers.clearLayers();
  }
  circleMarkers = L.layerGroup();

  // Centre on the US.
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
    // Skip both slon and slat are 0.
    if (row.slon === 0 && row.slat === 0) {
      return;
    }

    const mag = parseInt(row.mag);
    const color = getColor(mag);
    const marker = L.circleMarker([row.slat, row.slon], {
      color: color,
      fillColor: color,
      fillOpacity: 0.9,
      radius: 5,
      // Store the magnitude in the feature's properties for later use
      properties: { mag: mag }
    });

    marker.bindPopup(
      `<b>State: </b>${row.st}<br>` + '<br>' +
      `<b>EF Scale: </b>${mag}<br>` +
      `<b>Length: </b>${row.len} miles<br>` +
      `<b>Width: </b>${row.wid} yards`
    );
    circleMarkers.addLayer(marker);
  });

  // Remove previous layer control
  if (map.hasLayer(circleMarkers)) {
    map.removeLayer(circleMarkers);
  }

  // Add the markers to the map.
  circleMarkers.addTo(map);

  // Create a layer control and add it to the map
  const overlayMaps = {
    "Tornadoes": circleMarkers,
  };

  // Remove previous layer control
  if (layerControl) {
    map.removeControl(layerControl);
  }

  // Add new layer control
  layerControl = L.control.layers(null, overlayMaps, {collapsed: false});
  layerControl.addTo(map);

  // Only create the legend if it doesn't exist yet
  if (!legend) {
    legend = new L.Control.Legend({ position: 'bottomright' });
    legend.addTo(map);

    // Add click event listeners to legend items
    const spans = legend.getContainer().querySelectorAll('span');
    spans.forEach(span => {
      const mag = efDescriptions.indexOf(span.innerHTML.trim()) + 1;
      span.onclick = () => {
        const layers = circleMarkers.getLayers();
        layers.forEach(layer => {
          // Check if the layer's mag matches the clicked item's mag
          if (parseInt(layer.feature.properties.mag) === mag) {
            if (span.classList.contains('selected')) {
              circleMarkers.addLayer(layer); // add layer back if selected
              span.classList.remove('selected');
            } else {
              circleMarkers.removeLayer(layer); // remove layer if not selected
              span.classList.add('selected');
            }
          }
        });
      };
    });
  }

// Update the legend to show all items as selected by default
const spans = legend.getContainer().querySelectorAll('span');
spans.forEach(span => {
  const mag = efDescriptions.indexOf(span.innerHTML.trim()) + 1;
  const layers = circleMarkers.getLayers();
  layers.forEach(layer => {
    if (parseInt(layer.feature.properties.mag) === mag) {
      circleMarkers.addLayer(layer); // add layer back if selected
    }
  });
  span.classList.add('selected');
});

};