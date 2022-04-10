// const express = require('express');
// const app = express();

// /**
//  * Data Storage
//  */
// const Datastore = require('nedb')

// app.listen(3000, () => console.log('Server is listening on port 3000'));
// app.use(express.static('public'));
// app.use(express.json({ limit: '50mb'}));

// /**
//  * Database
//  */
// const database = new Datastore('database.db');
// database.loadDatabase();

// app.post('/api',(request, response) => {
//     const data = request.body;
//     const timestamp = Date.now();
//     data.timestamp = timestamp;
//     database.insert(data);
// })

var cloudflare = require('cloudflare-express');
var express = require('express');
var app = express();
app.use(cloudflare.restore());
