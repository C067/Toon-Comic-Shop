//Callum Dodge

var express = require("express");
var app = express();

var path = require("path");
var fs = require("fs");

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});


//JavaScript Files
var registration = require(path.join(__dirname, '/js/Registration.js'));
var login = require(path.join(__dirname, '/js/Registration.js'));

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

app.post("/", urlencodedParser, (req, res) => {
    
    var Client = req.body;
    
    try {
        var login = JSON.parse(fs.readFileSync(path.join(__dirname,'/json/register.json'), 'utf8'));
    }
    catch {
        res.send("Error file not read");
        res.status(404).redirect("/");
    }

    var loginData = [];
    var found = false;
    for (var cnt = 0; cnt < login.length; cnt++) {
        if (Client.Email == login[cnt].Email && Client.Password == login[cnt].Password) {
            console.log("Found user: " + login[cnt].Username);
            found = true;
            login[cnt].Login = true;
            fs.writeFile(path.join(__dirname,'/json/register.json'), JSON.stringify(login, null, 3) , function(err) {
                if (err) {
                    console.log(err);
                }
            });
            break;
        }
    }

    if (!found) {
        console.log("No user found");
    }
    
    res.redirect("/");
});

app.listen(HTTP_PORT, onHTTPStart);
