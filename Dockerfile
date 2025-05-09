# Dockerfile
FROM python:3.9-slim

# set workdir
WORKDIR /app

# copy code & install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# tell Cloud Run which port to listen on
ENV PORT 8080

# use Gunicorn as your WSGI server
CMD ["python", "-m" , "flask", "run", "--host=0.0.0.0", "--port", "8080"]
