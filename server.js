const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errors = require('./helpers/errors');

const AuthenticationService = require('./services/authentication');
const AuthorizationService = require('./services/authorization');

module.exports = (db, config) =>{
    const app = express();

    //Services

    //Controllers

    app.use(express.static('public'));
    app.use(cookieParser(config.cookie.key));
    app.use(bodyParser.json());

    return app;
}