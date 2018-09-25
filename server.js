//Callum Dodge

var express = require("express");
var app = express();

var path = require("path");
var fs = require("fs");

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});

var registration = require(path.join(__dirname, '/js/Registration.js'));

var HTTP_PORT = process.env.PORT || 8080;


function onHTTPStart() {
    console.log("Listening on " + HTTP_PORT);
}

//Create folders on the server
app.use('/assets', express.static('assets'));
app.use('/js', express.static('js'));
app.use('/json', express.static('json'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/Views/index.html"));
});

app.get("/Registration", function(req, res) {
    res.sendFile(path.join(__dirname, "/Views/Registration.html"));
});

app.post("/Registration", urlencodedParser, function(req, res) {
    var Client = req.body;

    fs.appendFile(path.join(__dirname,'/json/register.json'), JSON.stringify(Client, null, 3) , function(err) {
        if (err) {
            console.log(err);
        }
    });

    res.send({redirect: "/Login"});
});

app.get("/Login", function(req, res) {
     res.sendFile(path.join(__dirname, "/Views/Login.html"));
});

app.post("/Login", urlencodedParser, function(req, res) {
    var Client = req.body;

    var register = JSON.parse(fs.readFileSync(path.join(__dirname,'/json/register.json'), 'utf8'));

    register.push(Client);

    fs.writeFile(path.join(__dirname,'/json/register.json'), JSON.stringify(register, null, 3) , function(err) {
        if (err) {
            console.log(err);
        }
    });

    res.redirect("/Login");
});

app.listen(HTTP_PORT, onHTTPStart);
