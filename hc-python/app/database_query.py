import iris, json
from flask import current_app, g

selectDiagnoseQuery = (
    lambda db_name: f"SELECT DISTINCT i_dg_kod FROM {db_name}"
)
selectPatientsQuery = lambda db_name: f"SELECT DISTINCT ic_pac FROM {db_name}"
selectPatientsIdQuery = (
    lambda db_name: f"SELECT * FROM {db_name} WHERE ic_pac=?"
)
selectPatientsIdVectorQuery = (
    lambda db_name: f"""SELECT TOP ? VECTOR_DOT_PRODUCT(amb_zaz_text_vector, TO_VECTOR(?)) AS confidence, * 
    from {db_name} 
    WHERE ic_pac=?
    ORDER BY confidence DESC"""
)


def selectDiagnose():
    g.cursor.execute(selectDiagnoseQuery(current_app.config["DB_NAME"]))
    result = [row[0] for row in g.cursor.fetchall()]
    return list(result)


def selectPatients():
    g.cursor.execute(selectPatientsQuery(current_app.config["DB_NAME"]))
    result = [row[0] for row in g.cursor.fetchall()]
    return list(result)


def selectPatientsId(patientId):
    g.cursor.execute(
        selectPatientsIdQuery(current_app.config["DB_NAME"]), [patientId]
    )
    results = [
        dict(
            (g.cursor.description[i][0], str(value))
            for i, value in enumerate(row[:-1])
        )
        for row in g.cursor.fetchall()
    ]
    return results


def selectPatientsIdVector(
    patientId,
    query,
    quality,
    limit
):
    g.cursor.execute(
        selectPatientsIdVectorQuery(current_app.config["DB_NAME"]),
        [limit, str(query), patientId],
    )
    result = g.cursor.fetchall()
    results = [
        dict(
            (g.cursor.description[i][0], str(value))
            for i, value in enumerate(row[:-1])
        )
        for row in result
    ]
    return results
