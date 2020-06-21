const express                  = require("express"),
      router                   = express.Router({mergeParams: true});


//landing
router.get("/", (req, res)=>{
    res.render("teacher/landing");
});

module.exports = router