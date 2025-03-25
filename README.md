# Full-Stack_Resume_Docker

## Overview
This is a full-stack application with a React frontend and FastAPI backend, containerized with Docker for easy deployment.

## Architecture
- **Frontend**: React application served by Nginx on port 80
- **Backend**: FastAPI application running on port 8000 (not exposed to public)
- **Networking**: Nginx proxy routes API requests from frontend to backend

## Security Features
- Backend API is not directly exposed to the internet
- All API requests are proxied through Nginx on the frontend
- Only port 80 is exposed to the public (port 443 for HTTPS in future)

## Docker Information
### To run a build use the following command:
```
docker-compose up --build
```

### Accessing the Application
- **Local Development**: http://localhost:80
- **Production**: Access via your domain name

### Configuration
The application uses Nginx as a reverse proxy to route API requests from the frontend to the backend service. This keeps the backend secure while allowing the frontend to communicate with it.