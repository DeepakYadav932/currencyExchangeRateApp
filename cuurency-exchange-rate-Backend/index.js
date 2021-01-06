const express = require('express');
const app = express();
const currencyRoute = require('./routes/currency.routes')
const http = require('http');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://deepak:da.mjg123@cluster0.wg9eq.mongodb.net/DB?retryWrites=true&w=majority').then(() => {
    console.log('Database connected');
}).catch(() => {
    console.log('Database connection error');
})

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use('/api/currencies', currencyRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
})

