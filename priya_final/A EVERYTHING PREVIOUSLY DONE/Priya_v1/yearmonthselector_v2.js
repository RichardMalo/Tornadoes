// load in the second Data Set for later tinkering.
function loadData2() {
  return d3.csv('monthlydata.csv', (d) => {
    let year = d.Date.slice(0, 4);
    let month = d.Date.slice(4, 6);

    return {
      year: year,
      month: month,
      tornadoes: d.Tornadoes,
      fatalities: d.Fatalities
    }
  });
}

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

const yearsDropdown = d3.select("#selDataset2");
yearsDropdown.append("option")
  .attr("value", "default")
  .text("----Select a year----");

let data;
loadData2().then((result) => {
  data = result;
  let uniqueYears = [];
  data.forEach((row) => {
    if (!uniqueYears.includes(row.year)) {
      uniqueYears.push(row.year);
      yearsDropdown.append("option")
        .attr("value", row.year)
        .text(row.year);
    }
  });
});

 
function monthlyTornadoData(year) {
  const monthlyData = data.filter(row => {
    return row.year == year
  });

  console.log("Selected year", year, monthlyData);
  monthlyData.forEach(row => {
    const month = row.month;
    const id = monthMap[month];
    const selector = d3.select("#" + id);
    selector.text(row.tornadoes);
           
  });

}

window.loadData2 = loadData2;