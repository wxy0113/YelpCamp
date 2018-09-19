var mongoose = require("mongoose");

//Post
var postsSchema = mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model("Post", postsSchema);