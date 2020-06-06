let mongoose                = require("mongoose");

let Content = require("./content");

let lessonSchema = new mongoose.Schema({
    picture: String,
    title: String,
    content: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Content"
        }
    ],
});

module.exports = mongoose.model("Lesson", lessonSchema);