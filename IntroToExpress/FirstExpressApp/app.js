var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there!"); 
});

app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

app.get("/dog", function(req, res) {
    res.send("Meow");
});

app.get("/r/:subredditeName", function(req, res) {
    res.send("WELCOME TO A SUBREDDIT!");
})

app.get("*", function(req, res){
    res.send("Star");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log(("Server has started!!!"));
});