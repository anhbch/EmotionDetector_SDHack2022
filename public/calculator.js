function getData(){
    const Datastore = require('nedb');
    const database = new Datastore('/Users/duyvuquoc/Documents/EmotionalDetector_SDHack2022/database.db');
    database.loadDatabase();

    var datas_happy = new Array();
    var datas_sad = new Array();
    var datas_angry = new Array();
    let mean_emotions = {}
    let sortable = [];
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
    const fs = require('fs')
  
    // Data which will write in a file.
    let toWrite = null;
    setTimeout(function() {
        sortable.push(['happy', average(datas_happy)]);
        sortable.push(['sad', average(datas_sad)]);
        sortable.push(['angry', average(datas_angry)]); 
        sortable.sort(function(a,b){
            return a[1] - b[1];
        });
    }, 1000);
}

getData();
