# For Test connect server
# from flask import Flask

# app = Flask(__name__)

# @app.route('/')
# def index():
#     return 'Hello, World!'

# if __name__ == '__main__':
#     app.run()


from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:// postgres:GWFuture2022!M@localhost/Tornadoes'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/mydatabase'
db = SQLAlchemy(app)
