var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("../models/user")

router.get("/", function(req, res){
   res.render("landing"); 
});

//AUTH Routes
//Show Register
router.get("/register", function(req, res) {
    res.render("register");
});

//Sign Up
router.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("/register");
        }else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp "+user.username);
               res.redirect("/campgrounds"); 
            });
        }
    });
});

//Login
router.get("/login", function(req, res) {
   res.render("login");
});
router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}), function(req, res) {
});

//Logout
router.get("/logout", function(req, res) {
   req.logout(); 
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});

module.exports = router;