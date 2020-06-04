let mongoose                = require("mongoose");

let Video                   = require("./video");

let lessonSchema = new mongoose.Schema({
    picture: String,
    title: String,
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
});

module.exports = mongoose.model("Lesson", lessonSchema);