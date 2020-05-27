const express                  = require("express"),
      app                      = express();

app.set("view engine", "ejs");


//landing
app.get("/", (req, res)=>{
    res.render("landing");
});

//teacher main
app.get("/teacher", (req, res)=>{
    res.render("teacher");
});

//teacher calendar
app.get("/teacher/calendar", (req, res)=>{
    res.render("calendar");
});

//teacher finances
app.get("/teacher/finances", (req, res)=>{
    res.render("finances");
});

//teacher classroom
app.get("/teacher/classroom", (req, res)=>{
    res.render("classroom");
});



let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server on");
});