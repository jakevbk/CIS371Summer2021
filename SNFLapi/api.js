#!/usr/bin/env node

const express = require('express'), app = express(), port = process.env.PORT || 3500;

app.use(express.json());

var database = require('./database.js');

database.openDB();

var users = require('./users.js');

var posts = require('./posts.js');

app.use('/', posts);
app.use('/',users);

app.listen(port);

console.log("Began listening on port" + port);
