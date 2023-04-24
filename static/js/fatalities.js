// Get the 'select' element with the ID 'selDataset'
let selectElement = document.querySelector('#selDataset');

// Load the data from the CSV file
// function loadData() {
//   return d3.json('/data')
//     .then(data => {
//       return data;
//     });
// }

// Function to calculate fatalities per year
async function calculateFatalitiesPerYear(selectedYear) {
  const data = await loadData();
  let fatalities = 0;

  data.forEach(row => {
    const year = row.yr;
    const fat = parseInt(row.fat, 10);

    if (selectedYear === "1950-2021" || year.toString() === selectedYear) {
      fatalities += fat;
    }
  });

  return fatalities;
}

// Function to update the fatalities text in the HTML element
function updateFatalitiesText(fatalities) {
  d3.select("#fatalitiesText").text(fatalities);
}

// Add an event listener to the 'select' element that listens for changes to its value
selectElement.addEventListener('change', async function() {
  // Get the selected value (i.e., the selected date)
  let selectedDate = this.value;

  // Check if the selected value is "1950-2021"
  const allYearsSelected = selectedDate === "1950-2021";

  // Calculate fatalities for the selected year or all years
  const fatalities = await calculateFatalitiesPerYear(allYearsSelected ? "1950-2021" : selectedDate.split('-')[0]);

  // Update the fatalities text in the HTML element
  updateFatalitiesText(fatalities);
});

// Initial console log assuming that the first response is "1950-2021"
(async function() {
  const initialFatalities = await calculateFatalitiesPerYear("1950-2021");
  updateFatalitiesText(initialFatalities);
})();









  
   