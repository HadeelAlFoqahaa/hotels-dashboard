const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const hotelsRouter = require('./routes/hotels');


const app = express();

app.use(cors({
    origin: 'http://localhost:8080', // TODO Read from env file
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH', 'OPTIONS']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.status(200).send('Server is working :)');
});

app.use('/hotels', hotelsRouter);


module.exports = app;
