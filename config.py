import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY="KKASDFHASDKLFKIWERJASDVNALSKDF"
    JWT_SECRET_KEY="HFIWEIHRO38489TUHSHDFJSHGJDFJK"
    JWT_ACCESS_TOKEN_EXPIRES = 900         # 15 minutes
    JWT_REFRESH_TOKEN_EXPIRES = 7 * 24 * 3600  # 7 days
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_ACCESS_COOKIE_PATH = "/api"             
    JWT_REFRESH_COOKIE_PATH = "/api/refresh"    
    JWT_COOKIE_SAMESITE = "Lax"
    JWT_COOKIE_SECURE = False