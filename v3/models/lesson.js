let mongoose                = require("mongoose");


let lessonSchema = new mongoose.Schema({
    picture: String,
    title: String
});

module.exports = mongoose.model("Lesson", lessonSchema);