let mongoose                   = require("mongoose");


let categorySchema = new mongoose.Schema({
    img: String,
    name: String
});


module.exports = mongoose.model("Category", categorySchema);