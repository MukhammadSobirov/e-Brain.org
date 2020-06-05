let mongoose                = require("mongoose");


let textSchema = new mongoose.Schema({
    title: String,
    itself: String,
});

module.exports = mongoose.model("Text", textSchema);