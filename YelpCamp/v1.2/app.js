var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
//var Comment = require("./mondels/comment");
//var User = require("./models/user");
var seedDb = require("./seeds");

//seedDb();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing"); 
});

//Index
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(error, campgrounds){
        if(error){
            console.log(error);
        }else{
            res.render("index", {campgrounds: campgrounds});
        }
    });
    //res.render("campgrounds", {campgrounds: campgrounds});
});

//Create
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCamp = {name: name, image:image, description: description};
    Campground.create(newCamp, function(error, newCamp){
       if(error){
           console.log(error);
       }else{
           res.redirect("/campgrounds");
       }
    });
});

//New
app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});

//Show
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCamp){
        if(error){
            console.log(error);
        }else{
            //console.log(foundCamp);
            res.render("show", {foundCamp: foundCamp});
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp is working..."); 
});