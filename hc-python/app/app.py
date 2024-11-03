from flask import Flask, current_app, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config.from_pyfile("settings.py")
app.config["CORS_HEADERS"] = "Content-Type"

from database import *
from database_query import *
from utils import *
from ai_query import *


def request_builder(func):
    get_db()
    try:
        value = func()
        response = response_success(value)
    except Exception as e:
        response = response_error(e)
    close_db()
    return response


# db create script
with app.app_context():
    if int(current_app.config["GENERATE_DB"]):
        vectoring_model_init()
        print("initialized model")
        get_db()
        print("connect to the database")
        init_db()
        print("create db table")
        import_csv("./data/B-IHOK-AH_AMB-FINAL.csv", "|")
        print("load data from csv")
        vectoring_column("amb_zaz_text", "amb_zaz_text_vector")
        print("create vectors to the loaded data")
        populate_db()
        print("insert data into database")
        close_db()
        print("close db connection")


@app.route("/")
@cross_origin()
def hello_world():
    return "<p>Hello, HemoConnect!</p>"


@app.route("/diagnosis")
@cross_origin()
def get_diagnosis():
    # list of all the available diagnose
    return request_builder(selectDiagnose)


@app.route("/diagnosis/<diagnose_id>/patient")
@cross_origin()
def get_diagnosis_patients(diagnose_id):
    # list of all the available diagnose
    if not diagnose_id:
        return response_error("Diagnose code missing.")
    return request_builder(lambda: selectPatients(diagnose_id))


@app.route("/patient")
@cross_origin()
def get_patients():
    # list all the available patient
    return request_builder(selectPatients)


@app.route("/patient/<patient_id>")
@cross_origin()
def get_patient(patient_id):
    # all entries for specific patient
    if not patient_id:
        return response_error("Patient id missing.")
    return request_builder(lambda: selectPatientsId(patient_id))


@app.route("/patient/<patient_id>/query")
@cross_origin()
def get_patient_by_query(patient_id):
    if not patient_id:
        return response_error("Patient id missing.")
    quality = request.args.get("quality") or 0.01
    limit = request.args.get("limit") or 1
    query = request.args.get("query")
    if not quality:
        return response_error("Minimum quality param missing.")
    if not query:
        return response_error("Missing query string.")
    vectoring_model_init()
    result = request_builder(
        lambda: selectPatientsIdVector(
            patient_id, vectoring_query(query), quality, limit
        )
    )
    conditions = {
        "query": query,
        "key": "ic_amb_zad",
        "unstructured": "amb_zaz_text",
    }
    return request_builder(lambda: request_ai(result[0], conditions))


if __name__ == "__main__":
    app.run(port=current_app.config["PORT"] or 5000)
