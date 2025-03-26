# Full-Stack_Resume_Docker

## Overview
This is a full-stack application with a React frontend and FastAPI backend, containerized with Docker for easy deployment. The application now supports both HTTP and HTTPS.

## Architecture
- **Frontend**: React application served by Nginx on ports 80 (HTTP) and 443 (HTTPS)
- **Backend**: FastAPI application running on port 8000 (not exposed to public)
- **Networking**: Nginx proxy routes API requests from frontend to backend

## Security Features
- Backend API is not directly exposed to the internet
- All API requests are proxied through Nginx on the frontend
- HTTPS support with self-signed certificates
- HTTP to HTTPS option available (currently disabled)

## Docker Information
### To run a build use the following command:
```
docker-compose up -d
docker-compose up --build frontend
docker-compose up --build backend
```

### Accessing the Application
- **HTTP**: http://localhost
- **HTTPS**: https://localhost

### SSL Certificates
The application uses self-signed SSL certificates for HTTPS. In a production environment, you should replace these with valid certificates from a trusted Certificate Authority.

### Configuration
The application uses Nginx as a reverse proxy to route API requests from the frontend to the backend service. This keeps the backend secure while allowing the frontend to communicate with it.