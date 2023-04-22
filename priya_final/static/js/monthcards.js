//selecting the data 
const element = document.querySelector('#selDataset2');

//specifying months from the csv
const months = ["01","02","03","04","05","06","07","08","09","10","11","12"]

//adding event listener to change upon the selection for monthly data
element.addEventListener( 'change', async () => {
  const selectedYear = element.value;
  console.log("Fetching monthly data" + selectedYear);
  const data = await loadData();
  const yearlyData = data.filter(row => row.yr == selectedYear);
  console.log("Yearly data", yearlyData);

  //filtering month data 
  months.forEach(month => {
    const monthlyData = yearlyData.filter(row => row.mo == month);
    console.log("monthly data", monthlyData);
    const id = monthMap[month];
    const selector = d3.select("#" + id);
    selector.text(monthlyData.length);
  });
});

const yearsDropdown = d3.select("#selDataset2");
yearsDropdown.on("change", function() {
  const selectedYear = this.value;
  monthlyTornadoData(selectedYear);
});

// Define a mapping from month numbers to month IDs
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

function monthlyTornadoData(year, data) {
  const monthlyData = data.filter(row => row.year == year);

  console.log("Selected year", year, monthlyData);
  monthlyData.forEach(row => {
    const month = row.month;
    const id = monthMap[month];
    const selector = d3.select("#" + id);
    selector.text(row.tornadoes);
  });
}

window.addEventListener("load", async () => {
    console.log("page is fully loaded");
    const selectedYear = '1950';
    console.log("Fetching monthly data" + selectedYear);
    const data = await loadData();
    const yearlyData = data.filter(row => row.yr == selectedYear);
    console.log("Yearly data", yearlyData);
  
    //filtering month data 
    months.forEach(month => {
      const monthlyData = yearlyData.filter(row => row.mo == month);
      console.log("monthly data", monthlyData);
      const id = monthMap[month];
      const selector = d3.select("#" + id);
      selector.text(monthlyData.length);
  });
});
