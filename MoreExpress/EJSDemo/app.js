var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function(req, res){
    var thingVar = req.params.thing;
    res.render("love.ejs", {thingVar: thingVar});
});

app.get("/posts", function(req, res) {
   var posts = [
       {title: "One", auther: "W"},
       {title: "Two", auther: "X"},
       {title: "Three", auther: "Y"}];
   res.render("posts.ejs", {posts: posts});

});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening...");
});