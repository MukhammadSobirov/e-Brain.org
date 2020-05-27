const express                  = require("express"),
      app                      = express();

const indexRoute               = require("./routes/teacher/index"),
      classroomRoute           = require("./routes/teacher/classroom"),
      mainRoute                = require("./routes/teacher/main"),
      calendarRoute            = require("./routes/teacher/calendar"),
      financeRoute             = require("./routes/teacher/finances");



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