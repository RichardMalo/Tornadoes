// Get the 'select' element with the ID 'selDataset'
let selectWhatYear = document.querySelector('#selDataset');

// Load the data from the CSV file
// function loadData() {
//   return d3.csv('1950-2021_torn.csv');
// }

// Add an event listener to the 'select' element that listens for changes to its value
selectWhatYear.addEventListener('change', async function() {
  // Get the selected value (i.e., the selected date)
  let selectedDate = this.value;

  // Check if the selected value is "1950-2021"
  const allYearsSelected = selectedDate === "1950-2021";

  // Log the year to the console
  console.log(`Year selected: ${allYearsSelected ? "1950-2021" : selectedDate.split('-')[0]}`);
});

// Initial console log assuming that the first response is "1950-2021"
(function() {
  console.log("Year selected: 1950-2021");
})();


