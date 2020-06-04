let mongoose                = require("mongoose");


let videoSchema = new mongoose.Schema({
    link: String,
    title: String,
    text: String,
});

module.exports = mongoose.model("Video", videoSchema)