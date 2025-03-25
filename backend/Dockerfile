FROM tiangolo/tiangolo/uvicorn-gunicorn-fastapi:python3.9

WORKDIR /app

COPY ./backend /app

RUN pip install --no-cache-dir -r /app/requirements.txt

EXPOSE 8000

CMD ["uvicorn" "main.py", "--host", "0.0.0.0", "--port", "8000"]