// Get the 'select' element with the ID 'selDataset'
let selectElement = document.querySelector('#selDataset');

// Load the data from the CSV file
// function loadData() {
//   return d3.csv('1950-2021_torn.csv');
// }

// Function to calculate the total count of tornadoes per year
async function calculateTornadoCountPerYear(selectedYear) {
  // Load the data from the CSV
  const data = await loadData();
  let tornadoCount = 0;
  // Iterate through each row in the data
  data.forEach(row => {
    const year = row.yr;
    // Check if the current year matches the selected year or if all years are selected
    if (selectedYear === "1950-2021" || year === selectedYear) {
      tornadoCount++;
    }
  });

  return tornadoCount;
}

// Function to calculate fatalities per year
async function calculateFatalitiesPerYear(selectedYear) {
  // Load the data from the CSV
  const data = await loadData();
  let fatalities = 0;

  // Iterate through each row in the data
  data.forEach(row => {
    const year = row.yr;
    const fat = parseInt(row.fat, 10);
    
    // Check if the current year matches the selected year or if all years are selected
    if (selectedYear === "1950-2021" || year === selectedYear) {
      // Add the current row's fatalities to the total fatalities
      fatalities += fat;
    }
  });

  return fatalities;
}

// Function to calculate injuries per year
async function calculateInjuriesPerYear(selectedYear) {
  // Load the data from the CSV
  const data = await loadData();
  let injuries = 0;
  
  // Iterate through each row in the data
  data.forEach(row => {
    const year = row.yr;
    const inj = parseInt(row.inj, 10);
    
    // Check if the current year matches the selected year or if all years are selected
    if (selectedYear === "1950-2021" || year === selectedYear) {
      injuries += inj;
    }
  });

  return injuries;
}

// Function to update the tornado count, fatalities, and injuries text in the HTML
function updateStatsText(tornadoCount, fatalities, injuries) {
  // Update the tornado count text
  d3.select('#tornadoCountText').text(tornadoCount);
  // Update the fatalities text
  d3.select('#fatalitiesText').text(fatalities);
  // Update the injuries text
  d3.select('#injuriesText').text(injuries);
}

// Add an event listener to the 'select' element that listens for changes to its value
selectElement.addEventListener('change', async function() {
  // Get the selected value (i.e., the selected date)
  let selectedDate = this.value;

  // Check if the selected value is "1950-2021"
  const allYearsSelected = selectedDate === "1950-2021";
  const yearFilter = allYearsSelected ? "1950-2021" : selectedDate.split('-')[0];

  // Calculate the total count of tornadoes, fatalities, and injuries for the selected year or all years
  const tornadoCount = await calculateTornadoCountPerYear(yearFilter);
  const fatalities = await calculateFatalitiesPerYear(yearFilter);
  const injuries = await calculateInjuriesPerYear(yearFilter);

  // Update the tornado count, fatalities, and injuries text in the HTML
  updateStatsText(tornadoCount, fatalities, injuries);
});

// Initial update of the tornado count, fatalities, and injuries text assuming that the first response is "1950-2021"
(async function() {
  // Calculate the initial values for tornado count, fatalities, and injuries for all years (1950-2021)
  const initialTornadoCount = await calculateTornadoCountPerYear("1950-2021");
  const initialFatalities = await calculateFatalitiesPerYear("1950-2021");
  const initialInjuries = await calculateInjuriesPerYear("1950-2021");
  // Update the tornado count, fatalities, and injuries text in the HTML with the initial values
  updateStatsText(initialTornadoCount, initialFatalities, initialInjuries);
})();
