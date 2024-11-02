import json
from flask import Flask, current_app

app = Flask(__name__)
app.config.from_pyfile('settings.py')
app.app_context()

from database import *
from data_pd import *
with app.app_context():
    get_db()
    init_db()
    import_csv('./data/B-IHOK-AH_AMB-FINAL.csv', "|")
    populate_db()

@app.route("/")
def hello_world():
    print(current_app.config["CONNECTION_STRING"],
            current_app.config["DB_USER"],
            current_app.config["DB_NAME"],)
    return "<p>Hello, World!</p>"

if __name__ == '__main__':
   app.run(port=5000)   