chown appuser /documents;

su appuser;

./manage.py makemigrations;
./manage.py migrate;
./manage.py runserver 0:8000;