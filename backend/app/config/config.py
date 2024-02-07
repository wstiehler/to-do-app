import os
import string
import random
from datetime import timedelta


random_str = string.ascii_letters + string.digits + string.ascii_uppercase
key = ''.join(random.choice(random_str) for i in range(12))

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES =  timedelta(hours=6)
    JWT_SECRET_KEY = key