# HOTELS DASHBOARD
Simple Analytics dashboard for Hotels:

How to run:

## Backend side:

  If you don't like to use docker, make sure that you have stable postgres server on your machine
    
```bash
    cd backend
    copy .example.env file to .env file
    npm install
    npm run migrate
    npm run start or npm run dev if you like to make the server watches your changes
```
    
  Now the database is ready, (I'll make a script to fill the database with random data).
  Please check the port on ./bin/www cause by default its 3000 but if you're using this port so please change it,
  if you changed it please change iit on .env file for frontend project.

## Frontend side

```bash
    cd frontend
    copy .example.env file to .env file
    npm install
    npm run serve
```
 See the http://localhost:8080 (check the port) and start using the simple dashboard.
 if the port has been change please update it on ./backend/app.js
 from origin: 'http://localhost:8080' to the exact frontend port.
