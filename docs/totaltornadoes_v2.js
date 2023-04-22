// Select the dropdown menu element
let selectElement3 = document.querySelector('#selDataset');

// function loadData() {
//   return d3.json('/data')
//     .then(data => {
//       return data;
//     });
// }

// Asynchronous function to load tornado data from an external source
// Returns a Promise containing the loaded data
// Not shown: implementation of the `loadData` function
async function calculateTornadoCountPerYear(selectedYear) {
  const data = await loadData();
  // Loop through each row of the data and count the number of tornadoes that occurred in the selected year or range of years
  let tornadoCount = 0;
  data.forEach(row => {
    const year = row.yr;
    if (selectedYear === "1950-2021" || year.toString() === selectedYear) {
      tornadoCount++;
    }
  });
  // Return the total number of tornadoes
  return tornadoCount;
}

// Function to update the displayed text with the total number of tornadoes
function updateTornadoCountText(tornadoCount) {
  d3.select("#tornadoCountText").text(tornadoCount);
}

// Add an event listener to the dropdown menu element
selectElement3.addEventListener('change', async function() {
  // Get the selected value of the dropdown menu
  let selectedDate = this.value;
  // Determine if the user has selected the entire range of years (1950-2021)
  const allYearsSelected = selectedDate === "1950-2021";
  // Calculate the total number of tornadoes for the selected year or range of years
  const totalTornadoes = await calculateTornadoCountPerYear(allYearsSelected ? "1950-2021" : selectedDate.split('-')[0]);
  // Update the displayed text with the total number of tornadoes
  updateTornadoCountText(totalTornadoes);
});

// Immediately invoked function expression (IIFE) to calculate and display the total number of tornadoes for the entire range of years when the page loads
(async function() {
  const initialTornadoCount = await calculateTornadoCountPerYear("1950-2021");
  updateTornadoCountText(initialTornadoCount);
})();





