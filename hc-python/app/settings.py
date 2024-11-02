from os import environ
from dotenv import load_dotenv
load_dotenv()

CONNECTION_STRING = f"{environ.get('IRIS_HOSTNAME', 'localhost')}:{environ.get('PORT')}/{environ.get('NAMESPACE')}"
OPENAI_API_KEY=environ.get('OPENAI_API_KEY')
DB_USER=environ.get('DB_USERNAME')
DB_PASSWORD=environ.get('DB_PASSWORD')
DB_NAME=environ.get('DB_TABLE_NAME')