from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:// postgres:project@database-2.cjrkxejkebqc.us-east-1.rds.amazonaws.com/tornadoes_project'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/mydatabase'
db = SQLAlchemy(app)
