var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
//var User = require("./models/user");
var seedDb = require("./seeds");

//seedDb();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

app.get("/", function(req, res){
   res.render("landing"); 
});

//Index Camp
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(error, campgrounds){
        if(error){
            console.log(error);
        }else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
    //res.render("campgrounds", {campgrounds: campgrounds});
});

//Create Camp
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

//New Camp
app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new"); 
});

//Show Camp
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCamp){
        if(error){
            console.log(error);
        }else{
            //console.log(foundCamp);
            res.render("campgrounds/show", {foundCamp: foundCamp});
        }
    });
});

//New Comment
app.get("/campgrounds/:id/comments/new", function(req, res){
   Campground.findById(req.params.id, function(err, foundCamp){
       if(err){
           console.log(err);
       }else{
           res.render("comments/new", {foundCamp: foundCamp}); 
       }
   });
});

//Create Comment
app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp) {
       if(err){
           console.log(err);
           res.redirect("/campgounds");
       }else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   foundCamp.comments.push(comment);
                   foundCamp.save();
                   res.redirect("/campgrounds/"+foundCamp._id);
               }
           })
       }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp is working..."); 
});