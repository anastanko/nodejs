/*
var http = require('http');
var fs   = require('fs'); var path = require('path');
function send404(response) {    response.writeHead(404, {'Content-Type': 'text/plain'    });
response.write('Error 404. Introuvable.');
response.end(); }
var mimeLookup = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.html': 'text/html',
    '.ico': 'image/cnd.microsoft.icon'
};

var server = http.createServer(function (req, res) {
    if (req.method == 'GET') {
        var fileurl;
        if (req.url == '/') {
            fileurl = '/index.html';
        } else {
            fileurl = req.url;        }
        var filepath = path.resolve('./public' + fileurl);
        var fileExt = path.extname(filepath);
        var mimeType = mimeLookup[fileExt];
        if (!mimeType) {
            send404(res);
            return;
        }
        fs.exists(filepath, function (exists) {
            if (!exists) {
                send404(res);
                return;
            };
            res.writeHead(200, { 'content-type': mimeType });
            fs.createReadStream(filepath).pipe(res);
        });
    } else {
        send404(res);
    } }).listen(3000);console.log('Serveur en écoute sur le port 3000');*/
/*

var express = require('express');
var serveStatic = require('serve-static');
var app = express()    .use(serveStatic(__dirname + '/public'))    .listen(3000);*/

let colors = require('colors');
let MongoClient = require('mongodb').MongoClient;
let express = require('express');
let serveStatic = require('serve-static');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let Message = mongoose.model('Message',
    {msg: String,
        user: String,
        time: Date });

function launchWebServer(){
    console.log ("Launching WebServer ".green);
    let app = express()
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
            extended: true
        }))
        .get('/create-message', function(req,res) {
            let msg1 = new Message({
                msg: "Hello" + Date(),
                user: "Ana",
                time: Date() });

            console.log ( " Your message:". yellow ,msg1);
            console.log ("Saving message...".yellow);

            msg1.save(function(err){
                if (err){
                    res.json({succes: false, message: err});
                    console.log(err);
                    console.log ("There is a problem ".green);
                }else {
                    console.log ("Successful ".green);
                    res.json({succes: true, message: err});
                }
            });

        })

        .get('/new-messages', function(req, res){
            if(req.query.hasOwnProperty('date')){
               let  time_param = new Date(req.query['date']);
               console.log(time_param);
               Message.find(
                   {time: {$gt :time_param}},
                   function(err, messages) {
                       res.json(messages);
                   }
               );
            }else{
                res.setHeader('Content-Type', 'application/json');
                Message.find(
                    {},
                    function(err, messages) {
                        res.json(messages);
                        //console.log('je suis la')
                    }
                );
            }
        })

        .post('/create-message', function (req, res) {

            let msg1 = new Message({
                msg: req.body.message,
                user: req.body.username,
                time: Date() });


            msg1.save(function(err){
                if (err){
                    res.json({succes: false, message: err});
                    console.log(err);
                    console.log ("There is a problem ".green);
                }else {
                    console.log ("Successful ".green);
                    res.json({succes: true, message: err});
                }
            });


        })
        .use(serveStatic(__dirname + '/public'))    .listen(3000);
    console.log('Serveur en écoute sur le port 3000')


/*    let msg1 = new Message({
        msg: "Hello",
        user: "Ana",
        time: Date() });

    console.log ( " Your message:". yellow ,msg1);
    console.log ("Saving message...".yellow);

    msg1.save(function(err){
        if (err){
            console.log(err);
            console.log ("There is a problem ".green);
        }else {
            console.log ("Successful ".green);
        }
    });*/

};

mongoose.connect(
    "mongodb://localhost:27017/mydb",
    {useUnifiedTopology: true,
        useNewUrlParser: true},

    function(err, db) {
        console.log(err);
        if (!err) {
            console.log ("Successful connection to the database".green);
            launchWebServer();
            //console.log ("Closing DataBase".white);
           //db.close();
        }
    }
    );