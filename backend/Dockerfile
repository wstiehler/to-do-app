FROM python:3.6-slim-buster

RUN useradd -m appuser
USER appuser

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ .

ENV FLASK_APP=main.py
ENV PATH="/home/appuser/.local/bin:${PATH}"


EXPOSE 4000

CMD ["flask", "run", "--host=0.0.0.0", "--port=4000"]
