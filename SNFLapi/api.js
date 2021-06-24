#!/usr/bin/env node

const express = require('express'), app = express(), port = process.env.PORT || 3500;
app.use(express.json());

const cors = require('cors');
app.use(cors());

var database = require('./database.js');
database.openDB();

var users = require('./users.js');
var posts = require('./posts.js');

//const passport = require(./passport.js);
app.use('/', posts);
app.use('/',users);

app.listen(port);
console.log("Began listening on port" + port);
