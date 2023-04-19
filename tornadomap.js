// Declare the variable myMap otherwise it won't load.
let myMap;
let legend;

const efDescriptions = [
  'EF0 (65–85 mph): Light damage',
  'EF1 (86–110 mph): Moderate damage',
  'EF2 (111–135 mph): Considerable damage',
  'EF3 (136–165 mph): Severe damage',
  'EF4 (166–200 mph): Devastating damage',
  'EF5 (>200 mph): Incredible damage',
];

// Function to get the color based on the magnitude
function getColor(mag) {
  return mag === '0' ? '#ffa600' :
         mag === '1' ? '#f18e06' :
         mag === '2' ? '#e4750a' :
         mag === '3' ? '#d65c0d' :
         mag === '4' ? '#c83f0d' :
                       '#bf000b';
}

// Initialize the map with 1950 data
function initMap() {
  loadData().then(function (data) {
    // Filter data for the year 1950
    const filteredData = data.filter(row => row.yr === '1950');
    // Create the map with the filtered data
    createMap(filteredData);
  });
}
// Creating a legend.
function createLegend() {
  // Legend location bottomright.
  legend = L.control({ position: 'bottomright' });
  // What is inside the legend.
  legend.onAdd = function (map) {
    // Create HTML div element with the CSS classes "info" and "legend"
    const div = L.DomUtil.create('div', 'info legend');
     // Set the title of the legend
    div.innerHTML = '<h4>EF Scale</h4>';
    // Call updateLegendContent() to populate the legend with content
    updateLegendContent(div);
    // Push the content to the div.
    return div;
  };

  // Add the legend to the map
  legend.addTo(myMap);
}
// Function to update content of the legend with information about tornado intensities.
function updateLegendContent(div) {
  // If div element is not provided, select the first element with the CSS classes "info" and "legend"
  div = div || document.querySelector('.info.legend');
  // Set the title of the legend
  div.innerHTML = '<h4>Tornado EF Scale:</h4>';
  // Loop through every tornado intensity description in the efDescriptions array
  for (let i = 0; i < efDescriptions.length; i++) {
    // Convert intensity to string
    const mag = i.toString();
    // Get color associated with intensity rating using getColor()
    const color = getColor(mag);
    // Create HTML element to display the color box and description of the tornado intensity rating
    div.innerHTML += `<i style="background:${color}; width: 10px; height: 10px; display: inline-block;"></i> ${efDescriptions[i]}<br>`;
  }
}


// Create a map with the given data
function createMap(data) {
  // Create a Leaflet map centered on the United States
  if (!myMap) {
    myMap = L.map('Mapit').setView([40, -100], 4);

    // Add a tile layer (base map) to the Leaflet map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    // Call the function to add a legend to the map
    createLegend();
  } else {
    // Remove any existing markers and circle markers from the map (Clear the map!!! Otherwise the circles multiply)
    myMap.eachLayer(function (layer) {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        myMap.removeLayer(layer);
      }
    });
  }

  // Function to get the color based on the magnitude
  function getColor(mag) {
    return mag === '0' ? '#ffa600' :
           mag === '1' ? '#f18e06' :
           mag === '2' ? '#e4750a' :
           mag === '3' ? '#d65c0d' :
           mag === '4' ? '#c83f0d' :
                         '#bf000b';
  }

    // Plot tornado locations on the map for the selected year
    data.forEach(row => {
      const mag = row.mag;
      const color = getColor(mag);
      const marker = L.circleMarker([row.slat, row.slon], {
        color: color,
        fillColor: color,
        fillOpacity: 0.8,
        radius: 6
      }).addTo(myMap);
  
      // Add the EF Scale information to the marker popup
      marker.bindPopup(`EF Scale: ${mag}`);
    });
  
    // Update the legend content
    updateLegendContent();
  }
  
  // Initiate this baby!
  initMap();