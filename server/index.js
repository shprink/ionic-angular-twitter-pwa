/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// const express = require('express');
// const config = require('./config');
// const app = express();

// app.get('/', function (req, res) {
//     res.send('Hello World!')
// });
// console.log('config', config)
// app.listen(config.port, function () {
//     console.log('Example app listening on port ' + config.port)
// });

const serviceAccount = require("./serviceAccountKey.json");
const admin = require('firebase-admin');
const express = require('express');
const Twitter = require('twitter');
var bodyParser = require('body-parser')

const config = require('./config');
console.log('config', config)
require('dotenv').config();

const app = module.exports = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ionic-twitter-pwa.firebaseio.com"
});

const allowCrossDomain = function (req, res, next) {
    var allowedOrigins = ['http://localhost:8100', 'twitter-pwa.julienrenaux.fr'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
}

const authenticate = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = 'Content-Type, Authorization';
        res.writeHead(200, headers);
        res.end();
    } else {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            res.status(403).send('Unauthorized');
            return;
        }
        const [idToken, access_token_key, access_token_secret] = req.headers.authorization.split('Bearer ')[1].split(',');
        admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
            req.user = decodedIdToken;
            req.access_token_key = access_token_key;
            req.access_token_secret = access_token_secret;
            next();
        }).catch(error => {
            res.status(403).send('Unauthorized after check');
        });
    }
};

app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(authenticate);

app.post('/api/timeline', (req, res) => {
    var client = getTwitterClient(req);

    var params = { screen_name: 'nodejs' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            res.status(200).json(tweets);
        } else {
            res.status(400).json(error);
        }
    });
});

app.post('/api/tweet', (req, res) => {
    var client = getTwitterClient(req);
    client.post('statuses/update', req.body, function (error, tweet, response) {
        if (!error) {
            res.status(200).json(tweet);
        } else {
            res.status(400).json(error);
        }
    });
});

app.post('/api/messages', (req, res) => {
    var client = getTwitterClient(req);

    var params = { screen_name: 'nodejs' };
    client.get('direct_messages', params, function (error, messages, response) {
        if (!error) {
            res.status(200).json(messages);
        } else {
            res.status(400).json(error);
        }
    });
});

app.post('/api/user', (req, res) => {
    var client = getTwitterClient(req);
    client.get('users/show', req.body, function (error, user, response) {
        (!error) ? res.status(200).json(user) : res.status(400).json(error);
    });
});

app.post('/api/covers', (req, res) => {
    var client = getTwitterClient(req);
    client.get('users/profile_banner', req.body, function (error, covers, response) {
        (!error) ? res.status(200).json(covers) : res.status(400).json(error);
    });
});

// const server = http.createServer(app);

app.listen(config.port, (err) => {
    console.log(`server listening on port ${config.port}`)
});

function getTwitterClient(req) {
    return new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: req.access_token_key,
        access_token_secret: req.access_token_secret,
    });
}