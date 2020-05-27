const express                  = require("express"),
      router                   = express.Router({mergeParams: true});


//teacher classroom
router.get("/teacher/classroom", (req, res)=>{
    res.render("classroom");
});

module.exports = router