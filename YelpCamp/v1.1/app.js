var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill", 
//     image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//     description: "This is a huge granite hill, no bathrooms."
// }, function(error, campground){
//     if(error){
//         console.log(error);
//     }else{
//         console.log("Add successfully");
//         console.log(campground);
//     }
// });

// var campgrounds = [
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}];

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


app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(error, foundCamp){
        if(error){
            console.log(error);
        }else{
            res.render("show", {foundCamp: foundCamp});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp is working..."); 
});