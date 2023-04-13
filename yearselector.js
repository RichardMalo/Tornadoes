d3.csv('1950-2021_torn.csv').then(function(data) {
    // Extract unique years from the 'yr' column using the Set object
    let uniqueYears = new Set(data.map(year => year.yr));
    // Convert the set to an array and sort it in ascending order
    let sortedYears = Array.from(uniqueYears).sort();
    // Add "ALL YEARS" to the beginning of the sortedYears array
    sortedYears.unshift("1950-2021");
    
    // Create a selection for the dropdown menu
    let selectTab = d3.select("#selDataset");
    
    // Add options for each unique year to the dropdown menu
    sortedYears.forEach(year => {
      selectTab.append("option").text(year);
    });
  });