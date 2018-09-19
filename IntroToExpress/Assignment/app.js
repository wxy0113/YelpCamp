var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/pig", function(req, res){
    res.send("The pig says 'Oink'");
});

app.get("/repeat/:word/:num", function(req, res) {
   var word = req.params.word;
   var num = req.params.num;
   var str = word;
   for(var i = 1; i < num; i++){
       str += (" " + word);
   }
   res.send(str);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started");
});