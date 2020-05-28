const express                  = require("express"),
      app                      = express(),
      methodOverride           = require("method-override"),
      bodyParser               = require("body-parser");

let mongoose                   = require("mongoose");


const Category                 = require("./models/lessonCategories");


const indexRoute               = require("./routes/teacher/index"),
      classroomRoute           = require("./routes/teacher/classroom"),
      mainRoute                = require("./routes/teacher/main"),
      calendarRoute            = require("./routes/teacher/calendar"),
      financeRoute             = require("./routes/teacher/finances");


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/e_brain_v2");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");



app.use(indexRoute);
app.use(classroomRoute);
app.use(mainRoute);
app.use(calendarRoute);
app.use(financeRoute);


let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server on");
});