var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 5,
//     temperament: "Evil"
// });

// george.save(function(error, cat){
//     if(error){
//         console.log(("Something wrong.."));
//     }else{
//         console.log("Add successfully..");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "Snow",
    age: 15,
    temperament: "Nice"
}, function(error, cat){
    if(error){
        console.log(error);
    }else{
        console.log(cat);
    }
});

Cat.find({}, function(error, cats){
    if(error){
        console.log("Error...");
        console.log(error);
    }else{
        console.log(cats);
    }
});
