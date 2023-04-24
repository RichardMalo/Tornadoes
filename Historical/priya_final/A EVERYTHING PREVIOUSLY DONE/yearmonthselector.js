// load in the second Data Set for later tinkering.
function loadData2() {
  return d3.csv('monthlydata.csv');
}

// Create basic Months in an Array
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Select the dropdown selDataset3 linked to HTML.
const dropdown = d3.select("#selDataset3");

// Append options to the dropdown in a month in months fashion.
months.forEach((month) => {
    dropdown.append("option")
        .attr("value", month)
        .text(month);
});
// makes months global
window.loadData2 = loadData2;