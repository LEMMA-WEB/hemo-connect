import pandas
from flask import g


# Load the CSV file
def import_csv(path, separator, brute_force=True):
    df = pandas.read_csv(path, sep=separator, on_bad_lines=('skip' if brute_force else 'error'))
    df.fillna('', inplace=True)
    df.truncate()
    g.df = df
