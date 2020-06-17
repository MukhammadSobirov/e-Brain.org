const Category                  = require("../models/lessonCategories"),
      Lesson                    = require("../models/lesson"),
      Content                   = require("../models/content"),
      User                      = require("../models/user");

let middlewareObj = {};

//AUTH
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
};

module.exports = middlewareObj;