# Use official Python 3.11 image from Docker Hub
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application code into the container
COPY ./app /app

# Expose the application on port 80
EXPOSE 8000

# Run the application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
