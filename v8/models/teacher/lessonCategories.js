let mongoose                   = require("mongoose");

let Lesson                      = require("./lesson");


let categorySchema = new mongoose.Schema({
    img: String,
    name: String,
    lesson: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson"
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


module.exports = mongoose.model("Category", categorySchema);