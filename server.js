const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(express.static('to-do-vanilla'));
app.use('/calculator', express.static('calculator-vanilla'));
app.use('/to-do', express.static('to-do-vanilla'));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});
