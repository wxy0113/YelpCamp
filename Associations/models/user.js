var mongoose = require("mongoose");

//User
var userSchema = mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});
module.exports = mongoose.model("User", userSchema);