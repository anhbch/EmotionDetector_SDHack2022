const express = require('express');
const app = express();

/**
 * Data Storage
 */
const Datastore = require('nedb')

app.listen(3000, () => console.log('Server is listening on port 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '50mb'}));

/**
 * Database
 */
const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api',(request, response) => {
    database.find({},(err,data)=>{
        if(err){
            response.end();
            return;
        }
        response.json(data);
    })
});

app.post('/api',(request, response) => {
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json({
        status: 'success',
        timestamp: timestamp,
        happy: data.happy*100,
        angry: data.angry*100,
        sad: data.sad*100
    })
})