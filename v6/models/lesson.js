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
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Lesson", lessonSchema);