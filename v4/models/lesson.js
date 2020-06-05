let mongoose                = require("mongoose");

let Video                   = require("./video"),
    Text                    = require("./text");

let lessonSchema = new mongoose.Schema({
    picture: String,
    title: String,
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    texts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Text"
        }
    ]
});

module.exports = mongoose.model("Lesson", lessonSchema);