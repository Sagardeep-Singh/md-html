# MD HTML Switcher

The goal of this project is to create a web app that allows MD to HTMl and HTML to MD conversion. This app provides users with the ability to see the output in real time and save it on the server if the user signs up for an account.

## Languages used

- Reactjs has been used for the front end
- Python Django Framework for the REST API Backend
- C binary for Markdown to HTML conversion

## Methods used for communication

- Ajax calls from react to Python
- Executing the C binary from Python endpoint - _This is not the most elegent way for this communication_

## Steps to get the app running

Docker should start all the required components with the following command.

```
docker-compose up
```

## Features

- Ability to sign up and login with session based authenication
- Convertion from Markdown to HTMl (Uses C)
- Convertion from HTML to MD (Done by a python module)
- Ability to save and retrive Markdown documents


## References

- https://youtu.be/89KrqjqPeZ0
- https://www.django-rest-framework.org/api-guide/
- https://github.com/mity/md4c