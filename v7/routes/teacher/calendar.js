const express                  = require("express"),
      router                   = express.Router({mergeParams: true}),
      middlewareObj            = require("../../middlewares/index");


//teacher calendar
router.get("/teacher/calendar", middlewareObj.isLoggedIn, (req, res)=>{
    res.render("calendar");
});

module.exports = router
