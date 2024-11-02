import iris, json
from flask import current_app, g

selectDiagnoseQuery = lambda db_name :f"SELECT DISTINCT i_dg_kod FROM {db_name}"
selectPatientsQuery = lambda db_name :f"SELECT DISTINCT ic_pac FROM {db_name}"
selectPatientsIdQuery = lambda db_name :f"SELECT * FROM {db_name} WHERE ic_pac=?"
def selectDiagnose():
    g.cursor.execute(selectDiagnoseQuery(current_app.config["DB_NAME"]))
    result = [row[0] for row in g.cursor.fetchall()]
    return list(result)

def selectPatients():
    g.cursor.execute(selectPatientsQuery(current_app.config["DB_NAME"]))
    result = [row[0] for row in g.cursor.fetchall()]
    return list(result)

def selectPatientsId(patientId):
    g.cursor.execute(selectPatientsIdQuery(current_app.config["DB_NAME"]),[patientId])
    results = [dict((g.cursor.description[i][0], str(value)) \
               for i, value in enumerate(row[:-1])) for row in g.cursor.fetchall()]
    return json.dumps(results)