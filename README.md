# Group-6
## Impact of Tornadoes in the United States 1950-2021.

# Quick Link:
(http://tornadoesvisual.com)

#### How to Use:
- To use the dashboard, simply run the Python file "app2.py" (for a faster load use app.py from a CSV, for a load in from a SQLITE file use app2.py) in the command Prompt/Terminal. Use the dropdown menu to select the year to view tornado data for that year. The dashboard will update with the total number of tornadoes, fatalities, injuries for the selected year. The EF-scale toggle will display the magnitude with clicked/selected the tick-box.

#### Files used:
-   `Templates Folder:`
-   `index.html`: The main HTML file that contains the dashboard layout and functionality.
-   `Static/CSS Folder:`
-   `style.css`: The CSS file that styles the dashboard components.
-   `Static/JS Folder:`
-   `global.js`: The load in file to get the data out of data and push it into a window (global variable), that all further files can load from.
-   `yearselector_v2.js`: The JavaScript file that creates the drop-down menu.
-   `totaltornadoes_v2.js, fatalities.js, injuries.js `: 3 JavaScript files that calculate/display the total # of tornadoes, fatalities, and injuries for the selected year.
-   `tornadograph_v2.js`: The JavaScript file that creates the line graph showing the number of tornadoes over time.
-   `SEL2whatyear.js`: Populates The CSS file that styles the dashboard components.
-   `makemap.js`: The map file using LEAFLET to update the HTML with a map.
-   `monthcards.js`: File that calculates and pushes the Monthly data to the HTML calendar cards to quantify the US tornadoes by month.
-   `Data Folder:`
-   `1950-2021_torn.csv`, `file3.sqlite`, `tornado_data.sqlite` - the csv holds all data, the tornado_data also holds all data but in sqlite. file3 holds a filtered version of the sqlite file.
-   `Docs Folder:` - This folder holds modified code of the original version that runs on GitHubPages for class view.
-   `Historical Folder:` - this folder holds the previous attempts that lead up to a viable product.

### Analysis 

#### The regions which are most effected in the United States
- Number of Tornadoes events recorded per month every year from 1950 until 2021.
- The impact and damges caused due to the Tornadoes i.e., Fatalities and Injuries
- Strength of Enhanced Fujita Scale recorded.
- Top 10 States.

#### Questions answered from the analysis
- What are the safer places to visit/live in the United States vs most affected?
- How are the Tornadoes impacting the cities/states? Injuries and Deaths.
- Historical Distribution of Tornadoes? Where they happen.
- Which months are prone to tornado activity? Calendar view of activity.
- Which States, have experienced the greatest tornado activity overall? Visual Map Representation.

### Dashboard Analysis
#### Tornado Dashboard HTML Code:
The HTML code for the Tornado Dashboard presentation that visualizes tornado data from 1950 to 2021 in the United States. The Dashboard displays the total number of tornadoes, fatalities, and injuries that occurred for a selected year, along with a bar graph that shows the magnitude of the Tornadoes over time. Additionally, there is a map that displays tornado locations.

#### Dependencies
-   Leaflet JavaScript
-   Leaflet CSS
-   Plotly
-   D3 Library
-   Additional LIBRARY USED: Chart.JS Library

#### JavaScript for the Dashboard:
##### tornadograph_v2.js:
- JavaScript code that uses the Plotly library to create an interactive bar chart showing the number of tornado events by magnitude in the United States with respect to years. The code defines several functions that are used to filter, group, and format the data, as well as to create and update the plot and interactive legend.

##### tornadomap.js
- JavaScript code that creates a Leaflet map displaying the locations and intensities of tornadoes in the United States. The data used in the code is from the primary data source: https://www.spc.noaa.gov/wcm/#data,https://data.world/dhs/historical-tornado-tracks. The data containing the information about the Tornadoes from the year 1950-2018,including latitude and longitude of each tornado and its Enhanced Fujita (EF) scale rating is cleaned and extracted into a CSV file.

##### totaltornadoes_v2.js
- JavaScript code that counts the total number of tornado events recorded in a given year.

##### yearselector_v2.js
- JavaScript to populate the unique years and is used for the drop-down button.

#### fatalities.js
- Javascript code to populate the amount of fatalities.

#### injuries.js
- Javascript to populate injury count

#### global.js
- function that retrieves tornado data from an external source using `d3.json()`

#### mapselect_v1.js
- This JS gets the info to the makemap according to the year.

#### monthcards.js 
- JavaScript code to creating list of months and populating in tornado data, with the change of the years in the scroll down menu  

#### Building A Web Application 
##### Flask 
- Python code for Impact of Tornadoes web application built using the Flask framework. The application loads tornado data from a CSV file and displays it on an HTML page. The code defines two routes - one for the root URL '/' and another for '/data'. The index() function renders the HTML page with the tornado data loaded from the CSV file, while the load_csv_data() function reads the CSV file and returns a JSON string of the selected columns. The Flask development server is started with debug mode turned on. Overall, this code demonstrates how to use Flask to build a web application that can read data from a CSV file and display it on a web page.

### Tornado Dashboard
#### Overview 
This dashboard presents data on Tornado activity in the United States of America from the sources like https://www.spc.noaa.gov/wcm/#data,https://data.world/dhs/historical-tornado-tracks. These sources provide information on the number of Tornadoes that occurred by year, month, day and state, F-scale as well as details on the most severe tornadoes.

#### Dashboard Presentation 
-   Year: select a specific year to see Tornado activity for that year
-   Toggle: Choose a specific tornado intensity level (EF0-EF5) to see tornadoes of that severity.
-   Box: Tornado Count, Tornado Fatalities, Tornado Injuries
-   Bar Chart: Number of Tornado activities by Magnitude and Year in the USA.
-   Map: Displays the locations of the Tornado activity in the United States.

The dashboard also includes visualizations such as a box to view the number of Tornadoes that occurred in the year, Number of Tornado Fatalities recorded, Number of injuries encountered due to Tornado and Map.

#### Accessibility:
We tried to make the website adhere to: Web Content Accessibility Guidelines (WCAG) 2.1

#### Dashboard Limitations 
It's important to note that this dashboard only displays data from https://www.spc.noaa.gov/wcm/#data,https://data.world/dhs/historical-tornado-tracks and therefore the data is available until the year 2021. Additionally, some tornadoes may be missing or have incomplete data such as Damage costs and recovery period.
Other Limitations: This is not yet Mobile friendly as this was not in the scope of this project but for future iterations and versions as the project expands.