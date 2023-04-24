import os
from flask import Flask, render_template, jsonify
# from sqlalchemy import create_engine
# from sqlalchemy.orm import scoped_session, sessionmaker
# from sqlalchemy.pool import NullPool
import pandas as pd
import psycopg2

PGEND_POINT = 'database-2.cjrkxejkebqc.us-east-1.rds.amazonaws.com' # End_point_from AWS
PGDATABASE_NAME = 'tornadoes_db' # Database Name example: youtube_test_db
PGUSER_NAME = 'postgres' # UserName
PGPASSWORD = 'project3' # Password
 # Set up a connection to the postgres server.
conn_string = "host="+ PGEND_POINT +" port="+ "5432" +" dbname="+ PGDATABASE_NAME +" user=" + PGUSER_NAME \
                  +" password="+ PGPASSWORD   
conn = psycopg2.connect(conn_string)
print("Connected!")


app = Flask(__name__)

# Set up database
# db_file = os.path.join("data", "yrmomaginjfatslonslatstlenwid.sqlite")
# use this for 9 variables vs 10
# db_file = os.path.join("data", "file2.sqlite")
# use this for full data but much slower load.
# db_file = os.path.join("data", "tornado_data.sqlite")
# engine = create_engine(f"sqlite:///{db_file}", poolclass=NullPool)

# db = scoped_session(sessionmaker(bind=engine))
df = pd.read_sql("select * from tornadoes_project limit 10", con=conn)
print(df)

@app.route('/')
def index():
    data = load_db_data()
    return render_template('index.html', data=data)

@app.route('/data')
def load_db_data():
    # Select the desired columns
    # yr=year, mag=magnitude, inj=injuries, fat =fatalities, slon=starting longitude, slat =starting latiude, st=state, len=length of tornado, wid=width of tornado.
    selected_columns = ['yr', 'mo', 'mag', 'inj', 'fat', 'slon', 'slat', 'st', 'len', 'wid']
    # Execute a raw SQL query to fetch the data
    data = db.execute(f"SELECT {', '.join(selected_columns)} FROM tornado_data").fetchall()

    # Convert the fetched data to a JSON-friendly format
    result = []
    for row in data:
        result.append(dict(zip(selected_columns, row)))

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True,port=9000)