from flask import current_app, g
import random

selectDiagnoseQuery = (
    lambda db_name: f"SELECT DISTINCT i_dg_kod FROM {db_name}"
)
selectDiagnosePatientRecordQuery = (
    lambda db_name: f"SELECT * FROM {db_name} where i_dg_kod=? AND ic_pac=? AND ic_amb_zad=?"
)
selectPatientsQuery = (
    lambda db_name: f"SELECT ic_pac, max(dat_zad) AS last_dat, min(dat_zad) AS first_dat, text_dg FROM {db_name} group by ic_pac, text_dg"
)
selectDiagnosticPatientsQuery = (
    lambda db_name: f"SELECT ic_pac, max(dat_zad) AS last_dat, min(dat_zad) AS first_dat, text_dg FROM {db_name} where i_dg_kod=? group by ic_pac, text_dg"
)
selectDiagnosticSinglePatientsQuery = (
    lambda db_name: f"SELECT ic_pac, max(dat_zad) AS last_dat, min(dat_zad) AS first_dat, text_dg FROM {db_name} where i_dg_kod=? AND ic_pac=? group by ic_pac, text_dg"
)
selectPatientsIdQuery = (
    lambda db_name: f"SELECT * FROM {db_name} WHERE i_dg_kod=? and ic_pac=?"
)
selectPatientsIdVectorQuery = (
    lambda db_name: f"""SELECT TOP ? VECTOR_DOT_PRODUCT(amb_zaz_text_vector, TO_VECTOR(?)) AS confidence, * 
    from {db_name} 
    WHERE i_dg_kod=? and ic_pac=?
    ORDER BY confidence DESC"""
)


def selectDiagnose():
    g.cursor.execute(selectDiagnoseQuery(current_app.config["DB_NAME"]))
    result = [row[0] for row in g.cursor.fetchall()]
    return list(result)


def selectDiagnosePatientRecord(
    diagnose_id=None, patient_id=None, record=None
):
    g.cursor.execute(
        selectDiagnosePatientRecordQuery(current_app.config["DB_NAME"]),
        [diagnose_id, patient_id, record],
    )
    results = [
        dict(
            (g.cursor.description[i][0], str(value))
            for i, value in enumerate(row[:-1])
        )
        for row in g.cursor.fetchall()
    ]
    return results


def selectPatients(diagnose_id=None, patient_id=None):
    if diagnose_id and patient_id:
        g.cursor.execute(
            selectDiagnosticSinglePatientsQuery(
                current_app.config["DB_NAME"]
            ),
            [diagnose_id, patient_id],
        )
    elif diagnose_id:
        g.cursor.execute(
            selectDiagnosticPatientsQuery(current_app.config["DB_NAME"]),
            [diagnose_id],
        )
    else:
        g.cursor.execute(selectPatientsQuery(current_app.config["DB_NAME"]))
    results = dict()
    for row in g.cursor.fetchall():
        ic_pac, _, _, text_dg = row

        if ic_pac in results and text_dg:
            results[ic_pac]["text_dg"].add(text_dg)
        else:
            results[ic_pac] = {
                g.cursor.description[i][0]: str(value)
                for i, value in enumerate(row)
            }
            results[ic_pac]["text_dg"] = {text_dg} if text_dg else set()
            gen_mark = random.randint(0, 3)
            results[ic_pac]["gen_mark"] = (
                "" if gen_mark == 0 else "TP53" if gen_mark == 1 else "GHV"
            )
    json_results = [
        {
            **value,
            "text_dg": list(value["text_dg"]),
        }  # convert `text_dg` set to list
        for value in results.values()
    ]
    return json_results


def selectPatientsId(diagnose_id, patient_id):
    g.cursor.execute(
        selectPatientsIdQuery(current_app.config["DB_NAME"]),
        [diagnose_id, patient_id],
    )
    results = [
        dict(
            (g.cursor.description[i][0], str(value))
            for i, value in enumerate(row[:-1])
        )
        for row in g.cursor.fetchall()
    ]
    return results


def selectPatientsIdVector(diagnose_id, patient_id, query, quality, limit):
    g.cursor.execute(
        selectPatientsIdVectorQuery(current_app.config["DB_NAME"]),
        [limit, str(query), diagnose_id, patient_id],
    )
    results = [
        dict(
            (g.cursor.description[i][0], str(value))
            for i, value in enumerate(row[:-1])
        )
        for row in g.cursor.fetchall()
    ]
    return results
