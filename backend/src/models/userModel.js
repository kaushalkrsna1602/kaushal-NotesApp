const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        requied : true,
    },
    email : {
        type : String,
        requied : true,
        unique : true,
    },
    password : {
        type : String,
        requied : true,
    },
    role : {
        type : String,
        default : "user",
    },
})

module.exports = mongoose.model("User", userSchema);