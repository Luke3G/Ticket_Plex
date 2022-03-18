var express = require("express");
var path = require("path");

//ports

var app = express();
var PORT = 3000;

// crud
//Set up DB //





app.post("/add", function (req, res) {
    db.serialize(() => {
      db.run(
          "INSERT INTO CNAME(email, password, address, city, state, zip) VALUES(?,?,?,?,?,?)",
          [req.body.email, req.body.password, req.body.address, req.body.city, req.body.state, req.body.zip], 
          function (err) {
              if (err) {
                  return console.log(err.message);
                }
                console.log("New customer has been added");
                res.send(
                    "New customer has been added into the database with EMAIL = " +
              req.body.email +
              " and password = " +
              req.body.password +
              " and address = " +
              req.body.city +
              " and city " +
              req.body.address +
              " and state = " +
              req.body.state +
              " and zip = " +
              req.body.zip
              );
            }
            );
        });
    });

    //sign in crud
    app.post('/view', function(req,res){
        db.serialize(()=>{
            db.each('SELECT id , name NAME FROM tab WHERE id =?',[req.body.id],function(err,row){
                if (err){
                    res.send("ERROR encouterd while displaying");
                    return console.error(err.message);
                }
                res.send(` ID:  ${row.ID},    Name: ${row.NAME}`);
                console.log("ENTRY deslayed sucsesfull")
            });
        });
    });


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
  