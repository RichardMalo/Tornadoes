// Loads from Global Window to console log whats inside.
loadData2()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error loading the CSV file:", error);
  });

  