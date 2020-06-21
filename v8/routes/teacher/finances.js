const express                  = require("express"),
      router                   = express.Router({mergeParams: true}),
      middlewareObj            = require("../../middlewares/teacher/index");


//teacher finances
router.get("/teacher/finances", middlewareObj.isLoggedIn, (req, res)=>{
    res.render("teacher/finances");
});

module.exports = router