// Get the 'select' element with the ID 'selDataset'
let selectElement = document.querySelector('#selDataset');

// Load the data from the CSV file
function loadData() {
  return d3.csv('1950-2021_torn.csv');
}

// Function to calculate fatalities per year
async function calculateFatalitiesPerYear(selectedYear) {
  const data = await loadData();
  let fatalities = 0;

  data.forEach(row => {
    const year = row.yr;
    const fat = parseInt(row.fat, 10);

    if (selectedYear === "1950-2021" || year === selectedYear) {
      fatalities += fat;
    }
  });

  return fatalities;
}

// Function to calculate injuries per year
async function calculateInjuriesPerYear(selectedYear) {
  const data = await loadData();
  let injuries = 0;

  data.forEach(row => {
    const year = row.yr;
    const inj = parseInt(row.inj, 10);

    if (selectedYear === "1950-2021" || year === selectedYear) {
      injuries += inj;
    }
  });

  return injuries;
}

// Function to update the fatalities text in the HTML
function updateFatalitiesText(fatalities) {
  d3.select('#fatalitiesText').text(fatalities);
}

// Function to update the injuries text in the HTML
function updateInjuriesText(injuries) {
  d3.select('#injuriesText').text(injuries);
}

// Add an event listener to the 'select' element that listens for changes to its value
selectElement.addEventListener('change', async function() {
  // Get the selected value (i.e., the selected date)
  let selectedDate = this.value;

  // Check if the selected value is "1950-2021"
  const allYearsSelected = selectedDate === "1950-2021";
  const yearFilter = allYearsSelected ? "1950-2021" : selectedDate.split('-')[0];

  // Calculate fatalities and injuries for the selected year or all years
  const fatalities = await calculateFatalitiesPerYear(yearFilter);
  const injuries = await calculateInjuriesPerYear(yearFilter);

  // Update the fatalities and injuries text in the HTML
  updateFatalitiesText(fatalities);
  updateInjuriesText(injuries);
});

// Initial update of the fatalities and injuries text assuming that the first response is "1950-2021"
(async function() {
  const initialFatalities = await calculateFatalitiesPerYear("1950-2021");
  const initialInjuries = await calculateInjuriesPerYear("1950-2021");
  updateFatalitiesText(initialFatalities);
  updateInjuriesText(initialInjuries);
})();







  
   