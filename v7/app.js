const express                  = require("express"),
      app                      = express(),
      methodOverride           = require("method-override"),
      bodyParser               = require("body-parser"),
      passport                 = require("passport"),
      localStrategy            = require("passport-local");


let mongoose                   = require("mongoose");


const Category                  = require("./models/lessonCategories"),
      Lesson                    = require("./models/lesson"),
      Content                   = require("./models/content"),
      User                      = require("./models/user");

const indexRoute               = require("./routes/teacher/index"),
      classroomRoute           = require("./routes/teacher/classroom"),
      mainRoute                = require("./routes/teacher/main"),
      calendarRoute            = require("./routes/teacher/calendar"),
      financeRoute             = require("./routes/teacher/finances"),
      lessonRoute              = require("./routes/teacher/lesson/lesson"),
      auth                     = require("./routes/auth");



mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/e_brain_v7");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(require("express-session")({
    secret: "alohamora",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy((User.authenticate())));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    next();
});


app.use(indexRoute);
app.use(classroomRoute);
app.use(mainRoute);
app.use(calendarRoute);
app.use(financeRoute);
app.use(lessonRoute);
app.use(auth);



let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server on");
});