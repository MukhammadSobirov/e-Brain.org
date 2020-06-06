const express                  = require("express"),
      router                   = express.Router({mergeParams: true});


//landing
router.get("/", (req, res)=>{
    res.render("landing");
});

module.exports = router