// this JS gets the info to the makemap according to the year.
// Same as tornadegraph_v2 method Get the 'select' element with the ID 'selDataset2'
let selectElement4 = document.querySelector('#selDataset2');

// Not needed as its global.
// Load the data from the CSV file
// async function loadData() {
//   return d3.json('/data')
//     .then(data => {
//       return data;
//     });
// }

// Function to extract the 'slon' and 'slat' data for the given year
async function extractSlonSlatForYear(selectedYear) {
  const data = await loadData();
  const slonSlatData = [];

  data.forEach(row => {
    const year = row.yr;

    if (year.toString() === selectedYear) {
      const mag = parseInt(row.mag);
      const slon = parseFloat(row.slon);
      const slat = parseFloat(row.slat);

      slonSlatData.push({
        mag: mag,
        slon: slon,
        slat: slat
      });
    }
  });

  return slonSlatData;
}

// Add an event listener to the 'select' element that listens for changes to its value
selectElement4.addEventListener('change', async function() {
  // Get the selected value (i.e., the selected year)
  let selectedYear = this.value;

  // Extract the 'slon' and 'slat' data for the selected year
  const slonSlatData = await extractSlonSlatForYear(selectedYear);

  // Display the map with the 'slon' and 'slat' data
  displayMap(slonSlatData);
});

// Initial display assuming that the first response is the initially selected year
(async function() {
  const initialYear = selectElement4.value;
  const initialSlonSlatData = await extractSlonSlatForYear(initialYear);
  displayMap(initialSlonSlatData);
})();
