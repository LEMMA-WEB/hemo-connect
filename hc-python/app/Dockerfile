FROM python:3.8-slim

# Set the working directory within the container
WORKDIR /api-flask

# Copy the necessary files and directories into the container
COPY * /api-flask/

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt
RUN pip install ./api-flask/install/intersystems_irispython-5.0.1-8026-cp38.cp39.cp310.cp311.cp312-cp38.cp39.cp310.cp311.cp312-manylinux_2_17_x86_64.manylinux2014_x86_64.whl

# Expose port 5000 for the Flask application
EXPOSE 5000

# Define the command to run the Flask application using Gunicorn
CMD ["flusk run"]