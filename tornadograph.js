function loadData() {
  return d3.csv('1950-2021_torn.csv');
}

function filterData(data) {
  return data.filter(function(rawData) {
    return rawData.mag >= 1 && rawData.mag <= 5;
  });
}

function groupData(filteredData, mag) {
  return d3.nest()
    .key(function(rawData) { return rawData.yr; })
    .rollup(function(v) { return d3.sum(v, function(magVal) { return magVal.mag === mag ? 1 : 0; }); })
    .entries(filteredData);
}

function createTrace(data, mag, color) {
  return {
    x: data.map(function(x1) { return x1.key; }),
    y: data.map(function(y1) { return y1.value; }),
    name: 'EF Scale ' + mag,
    type: 'bar',
    marker: {
      color: color
    }
  };
}

function createLayout() {
  return {
    title: {
        text: 'Number of Tornado Events by Magnitude and Year in the USA',
        font: {
        size: 25
        }
    },
    barmode: 'stack',
    xaxis: {
        title: 'Year',
        titlefont: {
          size: 25
        },
        tickfont: {
          size: 18
        },
        range: [1948.5, 2022.5]
    },
    yaxis: {
        title: 'Number of Tornado Events',
        titlefont: {
            size: 25
        },
        tickfont: {
            size: 18
        }
    },
    legend: {
        title: {
        text: 'Tornado Magnitude: <br>(Click/Double Click<br>To Toggle EF Value)<br>',
        font: {
        size: 18
        }
          }
        },
        margin: {
            l: 100,
            r: 50
        }
      };
}

function createPlot(data) {
  let filteredData = filterData(data);

  let magYear1 = groupData(filteredData, '1');
  let magYear2 = groupData(filteredData, '2');
  let magYear3 = groupData(filteredData, '3');
  let magYear4 = groupData(filteredData, '4');
  let magYear5 = groupData(filteredData, '5');

  let trace1 = createTrace(magYear1, '1', 'FFCC99');
  let trace2 = createTrace(magYear2, '2', 'FFA07A');
  let trace3 = createTrace(magYear3, '3', 'FF7F50');
  let trace4 = createTrace(magYear4, '4', 'FF4500');
  let trace5 = createTrace(magYear5, '5', 'FF0000');

  let traceData = [trace1, trace2, trace3, trace4, trace5];
  
  let layout = createLayout();

  Plotly.newPlot('myDiv', traceData, layout);
}

function createLegend() {
  let legendItems = ['Magnitude 1', 'Magnitude 2', 'Magnitude 3', 'Magnitude 4', 'Magnitude 5'];
  let visibleTraces = [true, true, true, true, true];
  let toggleButton = d3.select('#toggle');

  toggleButton.selectAll('input')
.data(legendItems)
.enter()
.append('div')
.style('display', 'inline-block')
.html(function(rawData) {
return '<label><input type="checkbox" checked>' + rawData + '</label>';
})
.on('click', function(x, i) {
let clickedTrace = this.childNodes[0].checked;
let update = { visible: visibleTraces };
if (clickedTrace) {
  update.visible[i] = true;
} else {
  update.visible[i] = false;
}

Plotly.update('myDiv', update, {});
});}

function init() {
loadData().then(createPlot);
createLegend();
}

init();