const express                  = require("express"),
      router                   = express.Router({mergeParams: true}),
      middlewareObj            = require("../../middlewares/teacher/index");


//teacher calendar
router.get("/teacher/calendar", middlewareObj.isLoggedIn, (req, res)=>{
    res.render("teacher/calendar");
});

module.exports = router
