let mongoose                = require("mongoose");

let contentSchema = new mongoose.Schema({
    videoLink: String,
    videoTitle: String,
    videoText: String, 
    titleText: String,
    paragraph: String,
    pictureLink: String,
    pictureTitle: String,
});
// let contentSchema = new mongoose.Schema({
//     text: {
//         title: String,
//         itself: String,
//     },
//     videos: {
//         videoLink: String,
//         videoTitle: String,
//         videoText: String, 
//     },
// });

module.exports = mongoose.model("Content", contentSchema);
