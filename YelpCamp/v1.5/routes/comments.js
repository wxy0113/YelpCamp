var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//New Comment
router.get("/new", middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, foundCamp){
       if(err){
           console.log(err);
       }else{
           res.render("comments/new", {foundCamp: foundCamp}); 
       }
   });
});

//Create Comment
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp) {
       if(err){
           console.log(err);
           res.redirect("/campgounds");
       }else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   foundCamp.comments.push(comment);
                   foundCamp.save();
                   req.flash("success", "Successfully added a new comment");
                   res.redirect("/campgrounds/"+foundCamp._id);
               }
           })
       }
    });
});

//Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
        }
    })
});

//Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("success", "Comment updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Delete
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("success", "Comment has been deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;