var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDemo", {useNewUrlParser: true});

//Post
var postsSchema = mongoose.Schema({
    title: String,
    content: String
});

var postModel = mongoose.model("postModel", postsSchema);

//User
var userSchema = mongoose.Schema({
    email: String,
    name: String,
    posts: [postsSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "wxy111@gmail.com",
//     name: "XIAOYU",
// });

// newUser.posts.push({
//     title: "asadasdqw",
//     content: "sdqwqwcq"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// })


// var newPost = new postModel({
//     title: "Reflections on Apple",
//     content: "They are delicious"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// });

// User.findOne({name: "XIAOYU"}, function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         user.posts.push({
//             title: "uiojkljl",
//             content: "mnkbk"
//         });
//         user.save(function(err, user){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log(user);
//             }
//         })
//     }
// });
