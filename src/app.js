const express = require('express');
const plantRouter = require('./routes/plant');

const app = express();

app.use(express.json());

app.use('/plants', plantRouter);

module.exports = app;
