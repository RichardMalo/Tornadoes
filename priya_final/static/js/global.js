// Define a global `loadData` function that retrieves tornado data from an external source using `d3.json()`
// The function returns a Promise that resolves with the loaded data
window.loadData = function() {
    return d3.json('/data')
      .then(data => {
        return data;
      });
  }
// Makes this variable global so every program can use it.
window.loadData()



