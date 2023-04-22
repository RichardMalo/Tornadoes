// Selecting the data 
const element = document.querySelector('#selDataset3');

// Specifying months from the csv
const months = ["01","02","03","04","05","06","07","08","09","10","11","12"]

// Adding event listener to change upon the selection for monthly data
element.addEventListener( 'change', async () => {

  // Get the selected year from the dropdown menu
  const selectedYear = element.value;

  // console.log("Fetching monthly data" + selectedYear);

  // To Load the data from the CSV file
  const data = await loadData();

  // Filtering the data to get only the rows with the selected year
  const yearlyData = data.filter(row => row.yr == selectedYear);
  // console.log("Yearly data", yearlyData);

  //Looping over the months and filter the data for each month
  months.forEach(month => {
    const monthlyData = yearlyData.filter(row => row.mo == month);
    // console.log("monthly data", monthlyData);

    // Get the ID of the HTML element corresponding to the month
    const id = monthMap[month];

    // Selecting the HTML element and set its text content to the number of tornadoes in the monthly data
    const selector = d3.select("#" + id);
    selector.text(monthlyData.length);
  });
});

// Selecting the years dropdown menu
const yearsDropdown = d3.select("#selDataset3");

// Adding an event listener to the years dropdown menu to update the monthly tornado data
yearsDropdown.on("change", function() {
  const selectedYear = this.value;
  monthlyTornadoData(selectedYear);
});

// Defining a mapping from month numbers to month IDs
const monthMap = {
  "01": "jan",
  "02": "feb",
  "03": "mar",
  "04": "apr",
  "05": "may",
  "06": "jun",
  "07": "jul",
  "08": "aug",
  "09": "sep",
  "10": "oct",
  "11": "nov",
  "12": "dec",
};

// Defining a function to update the monthly tornado data
function monthlyTornadoData(year, data) {
  const monthlyData = data.filter(row => row.year == year);

  // console.log("Selected year", year, monthlyData);
  monthlyData.forEach(row => {
    const month = row.month;
    const id = monthMap[month];

    // Label: Select the HTML element and set its text content to the number of tornadoes in the monthly data
    const selector = d3.select("#" + id);
    selector.text(row.tornadoes);
  });
}

// Adding an event listener to load the data for the year 1950 on page load
window.addEventListener("load", async () => {
    // console.log("page is fully loaded");
    const selectedYear = '1950';
    // console.log("Fetching monthly data" + selectedYear);

    //Load the data from the CSV file
    const data = await loadData();

    //Filtering the data to get only the rows with the selected year
    const yearlyData = data.filter(row => row.yr == selectedYear);
    // console.log("Yearly data", yearlyData);

    // Looping over the months and filter the data for each month
    months.forEach(month => {
      const monthlyData = yearlyData.filter(row => row.mo == month);
      // console.log("monthly data", monthlyData);
      const id = monthMap[month];
      const selector = d3.select("#" + id);
      selector.text(monthlyData.length);
  });
});

