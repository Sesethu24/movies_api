const express = require('express')
var cors = require('cors')
const PgPromise = require("pg-promise")
const bcrypt = require('bcrypt')
const app = express()
app.use(cors())
require('dotenv').config();
const req = require('express/lib/request');
const jwt = require('jsonwebtoken');
const axios = require('axios');
app.use(express.json());
const API = require('./api');

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});

const config = {
    connectionString:
    process.env.DATABASE_URL || "postgres://coder:coder123@localhost:5432/movie_app",
  };
  
  if (process.env.NODE_ENV == 'production'){
    config.ssl = { rejectUnauthorized: false }
  }
  
  const db = pgp(config);

API(app, db);


const userData = [{
    first_name: '',
    last_name: '',
    username: '',
    password: ''
}]


const port = process.env.PORT || 5000

app.listen(port, function(){
    console.log(`App running on port:${port}`);
})

