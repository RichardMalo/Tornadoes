// Load in data.
function loadData() {
  return d3.csv('1950-2021_torn.csv');
}

// Populate in the years into the selector dropdown menu.
function populateYearSelector() {
  // Load data and then process it
  loadData().then(function (data) {
    // Pull out the unique years from the data
    let uniqueYears = new Set(data.map(year => year.yr));
    // Sort years
    let sortedYears = Array.from(uniqueYears).sort();
    // Select the dropdown menu in the HTML by its ID
    let selectTab = d3.select("#selDataset");
    // Add "1950-2021" option at the beginning
    selectTab.append("option").text("1950-2021");
    // Append each year to the selectTab
    sortedYears.forEach(year => {
      selectTab.append("option").text(year);
    });
  });
}

// Update the plot based on the selected year in the dropdown menu
function optionChanged(selectedYear) {
  // Load the data then process it.
  loadData().then(function (data) {
    // If selected choice is 1950-2021 create a full bar chart with all years.
    if (selectedYear === "1950-2021") {
      createPlot(data);
    // Else, create bar chart based on only the selected year.
    } else {
      createPlot(data, selectedYear);
    }
  });
}