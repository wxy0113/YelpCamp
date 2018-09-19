var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost:27017/blogapp", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "First Blog",
//     image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
//     body: "Hello this is a blog!"
// });

//Index
app.get("/", function(req, res){
   res.redirect("/blogs"); 
});
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       }else{
           res.render("index", {blogs: blogs});
       }
   })
});

//New
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//Create
app.post("/blogs", function(req, res){
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           console.log(err);
           res.render("new");
       }else{
           res.redirect("/blogs");
       }
   });
});

//Show
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           console.log(err);
           res.redirect("/blogs");
       }else{
           res.render("show", {foundBlog: foundBlog});
       }
    });
});

//Edit
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.render("/blogs");
        }else{
            res.render("edit", {foundBlog: foundBlog});
        }
    })
});

//Update Rounte
app.put("/blogs/:id", function(req, res){
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, res.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs/" + req.params.id);
       }
   });
});

//Delete
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs");
       }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog App is running...")
});