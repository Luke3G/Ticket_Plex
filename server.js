var express = require("express");
var path = require("path");

//ports

var app = express();
var PORT = 3000;

//CRUD
let db = new sqlite3.Database('tab');
db.run('CREATE TABLE IF NOT EXISTS tab(id TEXT,name TEXT)');





// express app 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'./public')));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/signin", function(req, res){
    res.sendFile(path.join(__dirname, "signin.html"));
});
app.get("/membership", function(req, res){
    res.sendFile(path.join(__dirname, "membership.html"));
});
app.get("/broncos", function(req, res){
    res.sendFile(path.join(__dirname, "broncos.html"));
});
app.get("/avalanche", function(req, res){
    res.sendFile(path.join(__dirname, "avalanche.html"));
});



app.listen(PORT, function() {
    console.log("App is listening on port: " + PORT);
})
  