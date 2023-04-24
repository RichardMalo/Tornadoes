let selectElement3 = document.querySelector('#selDataset');

// function loadData() {
//   return d3.json('/data')
//     .then(data => {
//       return data;
//     });
// }

async function calculateTornadoCountPerYear(selectedYear) {
  const data = await loadData();
  let tornadoCount = 0;
  data.forEach(row => {
    const year = row.yr;
    if (selectedYear === "1950-2021" || year.toString() === selectedYear) {
      tornadoCount++;
    }
  });

  return tornadoCount;
}

selectElement3.addEventListener('change', async function() {
  let selectedDate = this.value;
  const allYearsSelected = selectedDate === "1950-2021";
  const totalTornadoes = await calculateTornadoCountPerYear(allYearsSelected ? "1950-2021" : selectedDate.split('-')[0]);
  console.log(`Total Tornadoes: ${totalTornadoes}`);
});

(async function() {
  const initialTornadoCount = await calculateTornadoCountPerYear("1950-2021");
  console.log(`Total Tornadoes for 1950-2021: ${initialTornadoCount}`);
})();




