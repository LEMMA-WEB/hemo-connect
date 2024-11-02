import json
from flask import Flask, current_app


app = Flask(__name__)
app.config.from_pyfile("settings.py")

from database import *
from database_query import *
from utils import *

def request(func):
    get_db()
    try:
        value = func()
        response = response_success(value)
    except:
        response = response_error("Db error")
    close_db()
    return response

with app.app_context():
    vectoring_model_init()
    print("initialized model")
    # get_db()
    # print("connect to the database")
    # init_db()
    # print("create db table")
    # import_csv('./data/B-IHOK-AH_AMB-FINAL.csv', "|")
    # print("load data from csv")
    # vectoring_column('amb_zaz_text', 'amb_zaz_text_vector')
    # print("create vectors to the loaded data")
    # populate_db()
    # print("insert data into database")
    # close_db()
    # print("close db connection")

@app.route("/")
def hello_world():
    return "<p>Hello, HemoConnect!</p>"


@app.route("/diagnosis")
def get_diagnosis():
    # list of all the available diagnose
    return request(selectDiagnose)


@app.route("/patient")
def get_patients():
    # list all the available patient
    return request(selectPatients)


@app.route("/patient/<patient_id>")
def get_patient(patient_id):
    # all entries for specific patient
    if not patient_id:
        return response_error("Patient id missing.")
    return request(lambda: selectPatientsId(patient_id))




if __name__ == "__main__":
    app.run(port=current_app.config["PORT"] or 5000)
