# Homeadventure

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development setup

In the main project directory run `docker-compose up` to start the backend. It will run on `http://localhost:8000`.
Run `ng serve` for an Angular dev server. Navigate to `http://localhost:4200/`.
Because backend and frontend run on different servers, you have to configure your browser to allow Cross-Origin-Requests.
For example: `chromium --disable-web-security --user-data-dir="test"`.

The backend and frontend only run on different servers to speed up the build process.
In the production release (`docker-compose up --build`), both run on the same server, so no Cross-Origin-Requests are made.
