const mongoose                = require("mongoose"),
      passportLocalMongoose   = require("passport-local-mongoose");


let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String, //{data: Buffer, contentType: String},
    name: String,
    surname: String,
    email: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);