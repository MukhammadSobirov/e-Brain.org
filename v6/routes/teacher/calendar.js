const express                  = require("express"),
      router                   = express.Router({mergeParams: true});



//teacher calendar
router.get("/teacher/calendar", (req, res)=>{
    res.render("calendar");
});

module.exports = router
