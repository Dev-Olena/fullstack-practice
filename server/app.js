const express = require('express');
const apiRouter = require ('./routes/apiRouter');

const app = express();
const bodyParser = express.json();

app.use(bodyParser);
app.use('/api', apiRouter);

module.exports = app;