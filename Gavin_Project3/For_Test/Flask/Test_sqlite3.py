import sqlite3
from flask import Flask

app = Flask(__name__)

def get_db():
    conn = sqlite3.connect('database.db')
    return conn

def query_db(query, args=(), one=False):
    conn = get_db()
    cur = conn.execute(query, args)
    results = cur.fetchall()
    conn.close()
    return (results[0] if results else None) if one else results

@app.route('/')
def index():
    records = query_db('SELECT * FROM mytable')
    return render_template('index.html', records=records)