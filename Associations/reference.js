var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDemo2", {useNewUrlParser: true});


var Post = require("./models/post.js");
// //Post
// var postsSchema = mongoose.Schema({
//     title: String,
//     content: String
// });

// var Post = mongoose.model("Post", postsSchema);


var User = require("./models/user.js");

// User.create({
//     email: "wxy333@gmail.com",
//     name: "WXYY"
// })

// Post.create({
//     title: "daqwqwe12314134",
//     content: "dquoieqown"
// }, function(err, post){
//     User.findOne({email: "wxy333@gmail.com"}, function(err, user){
//         if(err){
//             console.log(err);
//         }else{
//             user.posts.push(post);
//             user.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log(data);
//                 }
//             })
//         }
//     });
// });

// User.findOne({email: "wxy333@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });