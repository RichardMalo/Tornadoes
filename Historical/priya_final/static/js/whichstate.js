// Takes in tornado data & year, then returns object containing the # of tornadoes per state for specified year(yr)
function getTornadoCountsByState(data, year) {
    let tornadoCounts = {};
    // Loop through each tornado in data
    data.forEach(tornado => {
        // If tornado year(yr) matches the given year then check if state has a count, if so increment it; otherwise change to 1.
        if (tornado.yr === year) {
            let state = tornado.st;
            if (tornadoCounts[state]) {
                tornadoCounts[state]++;
            } else {
                tornadoCounts[state] = 1;
            }
        }
    });
    // Return object containing tornado counts by state
    return tornadoCounts;
};

// Takes in object with tornado counts by state and returns array of the top 10 states with highest tornado count, sorted descending
function getTopTenStates(tornadoCounts) {
    return Object.entries(tornadoCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
};

// Variable for chart so it can be destroyed before creating new chart. Without it JS failboats!
let myChart;

// Creates bar chart displaying top 10 states with highest tornado counts.
function createBarChart(topTenStates) {
    let ctx = document.getElementById('myChart').getContext('2d');
    
    // Not sure if this works internally using this JS. Had to modify the HTML too.
    ctx.canvas.height = 350;
    
    // Prep chart data
    let chartData = {
        labels: topTenStates.map(state => state[0]),
        datasets: [
            {
                label: '# of Tornadoes',
                data: topTenStates.map(state => state[1]),
                backgroundColor: '#d65c0d',
                borderColor: '#d65c0d',
                borderWidth: 1,
            },
        ],
    };
    
    // Configure the chart options
    let chartOptions = {
        maintainAspectRatio: false,
        scales: {
            x: {ticks: {font: {size: 20,},},},
            y: {beginAtZero: true,},
        },
    };
    
    // Destroy the previous chart if it exists
    if (myChart) {
        myChart.destroy();
    }
    
    // Create new bar chart
    myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
    });
};

// Updates chart based on the selected year
function updateChart(year) {
    // Load tornado data & update the chart with data for the selected year
    window.loadData().then(data => {
        const tornadoCounts = getTornadoCountsByState(data, year);
        const topTenStates = getTopTenStates(tornadoCounts);
        createBarChart(topTenStates);
    });
}

// This is the Init at page launch 
function init() {
    const initialYear = 1950;
    const yearSelect = document.getElementById("selDataset3");
  
    // Set the initial year as the selected value
    yearSelect.value = initialYear;
  
    // Populate the chart with the initial year's data
    updateChart(initialYear);
}

// Start the application
init();

// Add event listener year dropdown, so that the chart is updated when selected year changes
document.getElementById("selDataset3").addEventListener("change", () => {
    const selectedYear = parseInt(document.getElementById("selDataset3").value);
    updateChart(selectedYear);
});