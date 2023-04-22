function loadData() {
    return d3.csv('/data/1950-2021_torn.csv')
      .then(data => {
        // Convert the CSV data to JSON format
        const jsonData = data.map(d => {
          return {
            yr: +d.yr,
            mag: +d.mag,
            inj: +d.inj,
            fat: +d.fat,
            slon: +d.slon,
            slat: +d.slat,
            st: d.st,
            len: +d.len,
            wid: +d.wid,
            mo: +d.mo
          };
        });
        return jsonData;
      });
  }
  
  // Load the data and attach it to the window object
  loadData().then(data => {
    window.tornadoData = data;
  });
  