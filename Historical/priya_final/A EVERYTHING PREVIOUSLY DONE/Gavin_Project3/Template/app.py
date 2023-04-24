from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import csv

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
db = SQLAlchemy(app)

class Data(db.Model):
    yr = db.Column(db.Integer, primary_key=True)
    mag = db.Column(db.String(50))
    inj = db.Column(db.Integer)
    fat = db.Column(db.Integer)

    @staticmethod
    def load_data():
        with open('data/1950-2021_torn.csv', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                data = Data(yr=int(row['yr'], mag=int(row['mag'], inj=int(row['inj'], fat=int(row['fat'])))))
                db.session.add(data)
        db.session.commit()

Data.load_data()

data = Data.query.all()
for d in data:
    print(d.yr, d.mag, d.inj, d.fat)

