./manage.py makemigrations;
./manage.py migrate;
gunicorn --bind 0.0.0.0:8000 backend.wsgi