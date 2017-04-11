/*jslint node:true*/
"use strict";

var express = require('express'),
    ejs = require('ejs'),
    app = express();

app.set('view-engine', 'ejs');


app.get('/', function (req, res) {
    res.send("<h1 style=\"font-family: \"Tahoma\", sans-serif;\">Hello World!</h1>");
});

app.get('/profile', function (req, res) {
    
});

app.listen(3000, function () {
    console.log("Listening at :3000");
});