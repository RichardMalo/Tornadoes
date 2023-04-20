import os
from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.pool import NullPool


app = Flask(__name__)

# Set up database
engine = create_engine("sqlite:///data/file2.sqlite", poolclass=NullPool)

db = scoped_session(sessionmaker(bind=engine))

@app.route('/')
def index():
    data = load_db_data()
    return render_template('index.html', data=data)

@app.route('/data')
def load_db_data():
    # Select the desired columns
    # yr=year, mag=magnitude, inj=injuries, fat =fatalities, slon=starting longitude, slat =starting latiude, st=state, len=length of tornado, wid=width of tornado.
    selected_columns = ['yr', 'mag', 'inj', 'fat', 'slon', 'slat']#, 'st', 'len', 'wid']    

    # Execute a raw SQL query to fetch the data
    data = db.execute(f"SELECT {', '.join(selected_columns)} FROM tornado_data").fetchall()

    # Convert the fetched data to a JSON-friendly format
    result = []
    for row in data:
        result.append(dict(zip(selected_columns, row)))

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)