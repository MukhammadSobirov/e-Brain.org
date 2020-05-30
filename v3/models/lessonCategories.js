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
    ]
});


module.exports = mongoose.model("Category", categorySchema);