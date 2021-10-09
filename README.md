# HOTELS DASHBOARD
Simple Analytics dashboard for Hotels:

How to run:

## By docker 

- Make sure you have docker-compose by write docker-compose -v
```bash
    docker-compose up
```
- When the command finished make sure that the apps are working, go to http://localhost:8080
- please exec the backend container to run the migrate database file by 
```bash
    npm run migrate
```
- You can use this command to generate random reviews but to test all groups (weekly, monthly, daily)
  you have to fill extra data
```bash
    npm run generate-random
```

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
