from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:project3@database-2.cjrkxejkebqc.us-east-1.rds.amazonaws.com/tornadoes_project'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)

@app.route('/users')
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({'id': user.id, 'name': user.name, 'email': user.email})
        'om': user.om, 'yr': user.yr,'mo': user.mo,'dy': user.dy,'date': user.date,'time': user.time,'tz': user.tz,'st': user.st,'stf': user.stf,'stn': user.stn,'mag': user.mag,'inj': user.inj,'fat': user.fat,'loss': user.loss,'closs': user.closs,'slat': user.slat,'slon': user.slon,'elat': user.elat,'elon': user.elon,'len': user.len,'wid': user.wid,'ns': user.ns,'sn': user.sn,'sg': user.sg,'f1': user.f1,'f2': user.f2,'f3': user.f3,'f4': user.f4,'fc': user.fc
    return jsonify(user_list)

if __name__ == '__main__':
    app.run()
