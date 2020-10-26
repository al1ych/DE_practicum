const port = process.env.PORT || 3000;
const express = require("express");
const fs = require('fs');
const app = express();
const jsonParser = express.json();
app.use(express.urlencoded({extended: false}));
app.use(express.json({strict: false}));
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// SERVER START

let server = app.listen(port, () =>
{
    console.log("Server started...");
});