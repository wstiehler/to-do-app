FROM python:3.6-slim-buster

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ .

# Define a variável de ambiente FLASK_APP
ENV FLASK_APP=main.py

# Exponha a porta
EXPOSE 4000

# Comando para executar o aplicativo Flask
CMD ["flask", "run", "--host=0.0.0.0", "--port=4000"]
