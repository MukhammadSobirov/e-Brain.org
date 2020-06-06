const express                  = require("express"),
      router                   = express.Router({mergeParams: true});


//teacher finances
router.get("/teacher/finances", (req, res)=>{
    res.render("finances");
});

module.exports = router