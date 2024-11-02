import json
from flask import Flask, current_app


app = Flask(__name__)
app.config.from_pyfile("settings.py")

from database import *
from database_query import *
from utils import *

with app.app_context():
    get_db()
    print("connect to the database")
    vectoring_model_init()
    print("initialized model")
    # init_db()
    # print("create db table")
    # import_csv('./data/B-IHOK-AH_AMB-FINAL.csv', "|")
    # print("load data from csv")
    # vectoring_column('amb_zaz_text', 'amb_zaz_text_vector')
    # print("create vectors to the loaded data")
    # populate_db()
    # print("insert data into database")


def response_success(body):
    return (body, 200)


def response_error(body):
    return (body, 400)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/diagnosis")
def get_diagnosis():
    get_db()
    return response_success(selectDiagnose())


@app.route("/patient")
def get_patients():
    get_db()
    return response_success(selectPatients())


@app.route("/patient/<patient_id>")
def get_patient(patient_id):
    if not patient_id:
        return response_error(None)
    get_db()
    return response_success(selectPatientsId(patient_id))


if __name__ == "__main__":
    app.run(port=current_app.config["PORT"] or 5000)
