// Initialize the select element with year values
function initializeSelect() {
    const startYear = 1950;
    const endYear = new Date().getFullYear();
    const selectElement = d3.select("#selDataset2");

    for (let year = startYear; year <= endYear; year++) {
        selectElement.append("option").attr("value", year).text(year);
    }

    // Set initial value
    selectElement.property("value", startYear);

    // Initial log output
    console.log("Initial year:", startYear);
}

// Function to handle option change
function optionChanged2(year) {
    console.log("Selected year:", year);
}

// Initialize the select element and set initial log output
initializeSelect();
  
  
  
  


  
  