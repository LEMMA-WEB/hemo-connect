import iris
from flask import current_app, g


tableDefinition = """(ic_amb_zad INT, ic_amb_karta INT, ic_pac INT, 
                    dat_zad DATE, cas_zad TIME, prac_od INT, dg_kod MEDIUMTEXT, i_dg_kod MEDIUMTEXT, 
                    text_dg MEDIUMTEXT, i_text_dg MEDIUMTEXT, poz_text MEDIUMTEXT, amb_zaz_text LONGTEXT)"""
insertDefinition = lambda db_name: f"""Insert into {db_name} (ic_amb_zad, ic_amb_karta, ic_pac, 
                    dat_zad, cas_zad, prac_od, dg_kod, i_dg_kod, 
                    text_dg, i_text_dg, poz_text, amb_zaz_text) values (?,?,?,?,?,?,?,?,?,?,?,?)"""
deleteDefinition = lambda db_name: f"DELETE FROM {db_name}"
dropDefinition = lambda db_name: f"DROP TABLE {db_name}"
createDefinition = lambda db_name: f"CREATE TABLE {db_name} {tableDefinition}"

def get_db():
    if "db" not in g:
        g.db = iris.connect(
            current_app.config["CONNECTION_STRING"],
            current_app.config["DB_USER"],
            current_app.config["DB_PASSWORD"],
        )
        g.cursor = g.db.cursor()
    return g.db


def close_db():
    cursor = g.pop("cursor", None)
    db = g.pop("db", None)
    if cursor:
        cursor.close()
    if db:
        db.close()


def init_db():
    try:
        g.cursor.execute(dropDefinition(current_app.config["DB_NAME"]))
    except:
        pass
    g.cursor.execute(createDefinition(current_app.config["DB_NAME"]))


def populate_db():
    for _, row in g.df.iterrows():
        data = (
            row["ic_amb_zad"],
            row["ic_amb_karta"],
            row["ic_pac"],
            row["dat_zad"],
            row["cas_zad"],
            row["prac_od"],
            row["dg_kod"],
            row["i_dg_kod"],
            row["text_dg"],
            row["i_text_dg"],
            row["poz_text"],
            row["amb_zaz_text"],
        )
        g.cursor.execute(insertDefinition(current_app.config["DB_NAME"]), data)


def clear_db():
    g.cursor.execute(deleteDefinition(current_app.config["DB_NAME"]))