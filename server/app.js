const express = require('express');
const cors = require('cors');
const apiRouter = require ('./routes/apiRouter');
const {errorHandler} = require('./errorHandler');

const app = express();
const bodyParser = express.json();

app.use(cors());
app.use(bodyParser);
app.use('/api', apiRouter);
app.use(errorHandler);

module.exports = app;