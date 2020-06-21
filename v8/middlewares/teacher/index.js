const Category                  = require("../../models/teacher/lessonCategories"),
      Lesson                    = require("../../models/teacher/lesson"),
      Content                   = require("../../models/teacher/content"),
      User                      = require("../../models/teacher/user");

let middlewareObj = {};

//AUTH
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
};

module.exports = middlewareObj;