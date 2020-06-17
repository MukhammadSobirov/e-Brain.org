const express                  = require("express"),
      router                   = express.Router({mergeParams: true}),
      middlewareObj            = require("../../middlewares/index");


//teacher finances
router.get("/teacher/finances", middlewareObj.isLoggedIn, (req, res)=>{
    res.render("finances");
});

module.exports = router