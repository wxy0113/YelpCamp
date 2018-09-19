var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

//Index Camp
router.get("/", function(req, res){
    //eval(require('locus'));
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function(error, campgrounds){
            if(error){
                console.log(error);
            }else{
                if(campgrounds.length < 1){
                    var noMatch = "No campgrounds match that query, please try again.";
                    req.flash("error", noMatch);
                }
                res.render("campgrounds/index", {campgrounds: campgrounds});
            }
        });
    }else{
        Campground.find({}, function(error, campgrounds){
            if(error){
                console.log(error);
            }else{
                res.render("campgrounds/index", {campgrounds: campgrounds});
            }
        });
    }
    //res.render("campgrounds", {campgrounds: campgrounds});
});

//Create Camp
router.post("/", middleware.isLoggedIn,function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function(err, data){
        if(err || !data.length){
            req.flash('error', 'Invalid address');
            console.log(err);
            return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCamp = {name: name, image:image, author: author, description: description, location: location, lat: lat, lng: lng};
        Campground.create(newCamp, function(error, newCamp){
           if(error){
               console.log(error);
           }else{
               req.flash("success", "Successfully added a new campground");
               res.redirect("/campgrounds");
           }
        }); 
    });
});

//New Camp
router.get("/new", middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

//Show Camp
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCamp){
        if(error){
            console.log(error);
        }else{
            //console.log(foundCamp);
            res.render("campgrounds/show", {foundCamp: foundCamp});
        }
    });
});

//Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit", {foundCamp: foundCamp});
        }
    })
});

//Update
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    geocoder.geocode(req.body.location, function(err, data){
        if(err || !data.length){
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        req.body.campground.lat = data[0].latitude;
        req.body.campground.lng = data[0].longitude;
        req.body.campground.location = data[0].formattedAddress;
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCamp) {
           if(err){
               console.log(err);
               req.flash("error", err.message)
               res.redirect("back");
           }else{
               req.flash("success", "Campground updated!")
               res.redirect("/campgrounds/" + foundCamp._id);
           }
       }); 
    });
});

//Delete
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Campground has been deleted")
            res.redirect("/campgrounds");
        }
    })
});

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;