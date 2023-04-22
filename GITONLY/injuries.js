// Get the 'select' element with the ID 'selDataset'
let selectElement2 = document.querySelector('#selDataset');

// Load the data from the CSV file
// function loadData() {
//   return d3.json('/data')
//     .then(data => {
//       return data;
//     });
// }

// Function to calculate injuries per year
async function calculateInjuriesPerYear(selectedYear) {
  const data = await loadData();
  let injuries = 0;

  data.forEach(row => {
    const year = row.yr;
    const inj = parseInt(row.inj, 10);

    if (selectedYear === "1950-2021" || year.toString() === selectedYear) {
      injuries += inj;
    }
  });

  return injuries;
}

// Function to update the injuries text in the HTML element
function updateInjuriesText(injuries) {
  d3.select("#injuriesText").text(injuries);
}

// Add an event listener to the 'select' element that listens for changes to its value
selectElement2.addEventListener('change', async function() {
  // Get the selected value (i.e., the selected date)
  let selectedDate = this.value;

  // Check if the selected value is "1950-2021"
  const allYearsSelected = selectedDate === "1950-2021";

  // Calculate injuries for the selected year or all years
  const injuries = await calculateInjuriesPerYear(allYearsSelected ? "1950-2021" : selectedDate.split('-')[0]);

  // Update the injuries text in the HTML element
  updateInjuriesText(injuries);
});

// Initial console log assuming that the first response is "1950-2021"
(async function() {
  const initialInjuries = await calculateInjuriesPerYear("1950-2021");
  updateInjuriesText(initialInjuries);
})();
