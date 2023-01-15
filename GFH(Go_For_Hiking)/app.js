const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const tourRouters = require('./routes/tourRoutes');
const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(con => {
    console.log('DB connection successful');
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    req.time = 12;
    req.body = {
        data: {
            time: req.requestTime
        }
    }
    next();
})

app.use('/tour', tourRouters);

module.exports = app;
