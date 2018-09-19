var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req,res){
   var search = req.query.movie;
   //console.log(search);
   request("http://www.omdbapi.com/?s="+search+"&apikey=thewdb", function(error, response, body){
       if(!error && response.statusCode == 200){
           var results = JSON.parse(body);
           res.render("results", {results: results});
       }
   });
   
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Movie App is working...");
});