from sentence_transformers import SentenceTransformer
from flask import g

# Load a pre-trained sentence transformer model. This model's output vectors are of size 384
def vectoring_model_init():
    g.model = SentenceTransformer('all-MiniLM-L6-v2')

def vectoring_column(column_name, vectoring_column_name):
    embeddings = g.model.encode(g.df[column_name].tolist(), normalize_embeddings=True)
    g.df[vectoring_column_name] = embeddings.tolist()

def vectoring_query(query):
    return g.model.encode(query, normalize_embeddings=True).tolist() 

import pandas

# Load the CSV file
def import_csv(path, separator, brute_force=True):
    df = pandas.read_csv(path, sep=separator, on_bad_lines=('skip' if brute_force else 'error'))
    df.fillna('', inplace=True)
    df.truncate()
    g.df = df


def response_success(body):
    return (body, 200)


def response_error(body):
    return (body, 400)
