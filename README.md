# Group-6
## Impact of Tornadoes in the United States.

## Files used and how to use.
Main Folder:
app.py - this file uses a CSV to load in data if Database is unavailable
app2.py - this file uses flask to load in a yrmomaginjfatslonslatstlenwid.sqlite file to load. This should be used for presentation.
index.html in the MAIN directory is just a way to make the code work for githubpages. It is a modified code to make GitHubPages accessible for everyone to view if we dont get this up to AWS.
Data folder:
Has the SQLite files used and the CSV file in case all else fails.
Static folder:
Has the CSS and main JS files that push information to the templates/index.html.
Templates folder:
Houses the main index.html file that app.py and app2.py uses.

### Analysis 

#### The regions which are most effected in the United States
- Number of Tornadoes events recorded per month every year until 2021
- The impact and damges caused due to the Tornadoes i.e., Fatalities and Injuries
- Strength of Enhanced Fujita Scale recorded

#### Questions answered from the analysis
- What are the safe places to visit/live in the United States?
- How are the Tornadoes impacting the cities/states?
- Probability of Tornado?

### Dashboard Analysis
#### Tornado Dashboard HTML Code:
The HTML code for the Tornado Dashboard presentation that visualizes tornado data from 1950 to 2021 in the United States. The Dashboard displays the total number of tornadoes, fatalities, and injuries that occurred for a selected year, along with a bar graph that shows the magnitude of the Tornadoes over time. Additionally, there is a map that displays tornado locations.

#### Dependencies
- Leaflet JavaScript
-	Leaflet CSS
-	Plotly
-	D3 Library

#### How to Use:
- To use the dashboard, simply run the Python file "app.py" in the command Prompt/Terminal. Use the dropdown menu to select the year to view tornado data for that year. The dashboard will update with the total number of tornadoes, fatalities, injuries for the selected year. The EF-scale toggle will display the magnitude with clicked/selected the tick-box.

#### Files:
- index.html`: The main HTML file that contains the dashboard layout and functionality.
-	`style.css`: The CSS file that styles the dashboard components.
-	`yearselector_v2.js`: The JavaScript file that creates the drop-down menu.
-	`consolelogwhatyear.js`: The JavaScript file that logs the selected year to the console.
-	`box123.js`: The JavaScript file that calculates and displays the total number of tornadoes, fatalities, and injuries for the selected year.
-	`tornadograph_v2.js`: The JavaScript file that creates the line graph showing the number of tornadoes over time.

#### JavaScript for the Dashboard:
##### tornadograph_v2.js:
- JavaScript code that uses the Plotly library to create an interactive bar chart showing the number of tornado events by magnitude in the United States with respect to years. The code defines several functions that are used to filter, group, and format the data, as well as to create and update the plot and interactive legend.

##### tornadomap.js
- JavaScript code that creates a Leaflet map displaying the locations and intensities of tornadoes in the United States. The data used in the code is from the primary data source: https://www.spc.noaa.gov/wcm/#data,https://data.world/dhs/historical-tornado-tracks. The data conatining the information about the Tornadoes from the year 1950-2018,including latitude and longitude of each tornadoand its Enhanced Fujita (EF) scale rating is cleaned and extracted into a CSV file.

##### totaltornadoes_v2.js
- JavaScript code that counts the total number of tornado events recorded in a given year.

##### yearselector_v2.js
- JavaScript to populate the unique years and is used for the drop-down button.

#### Building A Web Application 
##### Flask 
- Python code for Impact of Tornadoes web application built using the Flask framework. The application loads tornado data from a CSV file and displays it on an HTML page. The code defines two routes - one for the root URL '/' and another for '/data'. The index() function renders the HTML page with the tornado data loaded from the CSV file, while the load_csv_data() function reads the CSV file and returns a JSON string of the selected columns. The Flask development server is started with debug mode turned on. Overall, this code demonstrates how to use Flask to build a web application that can read data from a CSV file and display it on a web page.

### Tornado Dashboard
#### Overview 
This dashboard presents data on Tornado activity in the United States of America from the sources like https://www.spc.noaa.gov/wcm/#data,https://data.world/dhs/historical-tornado-tracks. These sources provide information on the number of Tornadoes that occurred by year, month, day and state, F-scale as well as details on the most severe tornadoes.

#### Dashboard Presentation 
-	Year: select a specific year to see Tornado activity for that year
-	Toggle: Choose a specific tornado intensity level (EF0-EF5) to see tornadoes of that severity.
-	Box: Tornado Count, Tornado Fatalities, Tornado Injuries
-	Bar Chart: Number of Tornado activities by Magnitude and Year in the USA.
-	Map: Displays the locations of the Tornado activity in the United States.

The dashboard also includes visualizations such as a box to view the number of Tornadoes that occurred in the year, Number of Tornado Fatalities recorded, Number of injuries encountered due to Tornado and Map 

#### Dashboard Limitations 
It's important to note that this dashboard only displays data from https://www.spc.noaa.gov/wcm/#data,https://data.world/dhs/historical-tornado-tracks and therefore the data is available until the year 2021. Additionally, some tornadoes may be missing or have incomplete data such as Damage costs and recovery period.

 



