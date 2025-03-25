# Application settings

class Settings:
    # API settings
    API_TITLE = "Resume API"
    API_DESCRIPTION = "API for Resume Application"
    API_VERSION = "0.1.0"
    
    # CORS settings
    CORS_ORIGINS = ["http://localhost", "http://localhost:3000", "http://localhost:80"]
    CORS_ALLOW_CREDENTIALS = True
    CORS_ALLOW_METHODS = ["*"]
    CORS_ALLOW_HEADERS = ["*"]

# Create a settings instance
settings = Settings()