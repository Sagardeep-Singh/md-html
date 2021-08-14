# FROM node:16.6.1-buster as build

# WORKDIR /app

# COPY ./frontend ./

# RUN npm ci

# RUN npm run build

# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8-slim-buster

RUN apt-get update -y; apt-get upgrade -y; apt install default-libmysqlclient-dev -y gcc

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install pip requirements
COPY ./backend/requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
COPY ./backend /app
# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN adduser -u 1000 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

USER root
# RUN chown appuser /documents
# COPY --from=build /app/build /app/build

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
# File wsgi.py was not found in subfolder: 'my-project'. Please enter the Python path to wsgi file.
# CMD ["gunicorn", "--bind", "0.0.0.0", "backend.wsgi"]
ENTRYPOINT [ "bash","/app/start.sh"]
