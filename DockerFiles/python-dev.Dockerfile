# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8-slim-buster

RUN apt-get update -y; apt-get upgrade -y; apt install default-libmysqlclient-dev gcc -y

EXPOSE 8000

WORKDIR /app
COPY ./backend /app

RUN adduser -u 1000 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

ENV PATH /home/appuser/.local/bin:$PATH

# Install pip requirements
COPY ./backend/requirements.txt .
RUN python -m pip install -r requirements.txt

ENTRYPOINT ["bash","./start.sh"]