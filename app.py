import pandas as pd
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    data = load_csv_data()
    return render_template('index.html', data=data)

@app.route('/data')
def load_csv_data():
    df = pd.read_csv('data/1950-2021_torn.csv')
    # Add this line to select specific columns
    # yr=year, mag=magnitude, inj=injuries, fat =fatalities, slon=starting longitude, slat =starting latiude, st=state, len=length of tornado, wid=width of tornado.
    selected_columns = ['yr', 'mag', 'inj', 'fat', 'slon', 'slat', 'st', 'len', 'wid']  
    # Update this line to return only the selected columns
    return df[selected_columns].to_json(orient='records')  

if __name__ == '__main__':
    app.run(debug=True)


