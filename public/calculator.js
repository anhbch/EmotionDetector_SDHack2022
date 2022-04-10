const Datastore = require('nedb');
const database = new Datastore('/Users/duyvuquoc/Documents/EmotionalDetector_SDHack2022/database.db');
database.loadDatabase();

var datas_happy = new Array();
var datas_sad = new Array();
var datas_angry = new Array();

database.find({happy: {$gte:0.20}},(err,docs)=>{
    if(err){
        return;
    }
    for(item of docs){
        datas_happy.push(item.happy);
    }
})

database.find({sad: {$gte:0.20}},(err,docs)=>{
    if(err){
        return;
    }
    for(item of docs){
        datas_sad.push(item.sad);
    }
})

database.find({angry: {$gte:0.02}},(err,docs)=>{
    if(err){
        return;
    }
    for(item of docs){
        datas_angry.push(item.angry);
    }
})

const average = (array) => array.reduce((a, b) => a + b) / array.length;
setTimeout(function() {
    console.log(average(datas_happy)); // this will (probably) be defined, since nedb is fast & shouldn't take a full second
    console.log(average(datas_sad));
    console.log(average(datas_angry));
}, 1000);
