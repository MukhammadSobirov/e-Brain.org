const express                  = require("express"),
      router                   = express.Router({mergeParams: true});


//teacher main
router.get("/teacher", (req, res)=>{
    res.render("teacher");
});

module.exports = router