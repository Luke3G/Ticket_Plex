const sqlite3 = require('sqlite3').verbose();
var path = require("path");
const express = require('express');
//ports

var app = express();
var PORT = 3000;

// crud

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./index.html'));
})



const db = new sqlite3.Database('table')
db.run('CREATE TABLE IF NOT EXISTS tab(id TEXT,name TEXT)');




const bodyParser = require('body-parser')
const helmet = require('helmet')
const rateLimit = require("express-rate-limit");



const limiter = rateLimit({
    winowMs: 15 * 60 * 1000, max: 100
});

//sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());
app.use(limiter);







    
    app.post("/add", function (req, res) {
        db.serialize(() => {
          db.run(
              "INSERT INTO tab(id,name) VALUES(?,?)",
              [req.body.id, req.body.name],
              function (err) {
                  if (err) {
                      return console.log(err.message);
                    }
                    console.log("New Customer Added");
                    res.send(
                        "New Customer Added has been added into the database with ID = " +
                  req.body.id +
                  " and Password = " +
                  req.body.name
                  );
                }
                );
            });
        });

        //test
        //view
    app.post('/view', function(req,res){
        db.serialize(()=>{
            db.each('SELECT id , name NAME FROM table WHERE id =?',[req.body.id],function(err,row){
                if (err){
                    res.send("ERROR encouterd while displaying");
                    return console.error(err.message);
                }
                res.send(` ID:  ${row.ID},    Name: ${row.EMAIL}`);
                console.log("ENTRY deslayed sucsesfull")
            });
        });
    });

        


 




// express app 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/signin", function (req, res) {
    res.sendFile(path.join(__dirname, "signin.html"));
});
app.get("/membership", function (req, res) {
    res.sendFile(path.join(__dirname, "membership.html"));
});
app.get("/broncos", function (req, res) {
    res.sendFile(path.join(__dirname, "broncos.html"));
});
app.get("/avalanche", function (req, res) {
    res.sendFile(path.join(__dirname, "avalanche.html"));
});



app.listen(PORT, function () {
    console.log("App is listening on port: " + PORT);
});
