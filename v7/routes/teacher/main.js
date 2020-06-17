const express                  = require("express"),
      router                   = express.Router({mergeParams: true}),
      middlewareObj            = require("../../middlewares/index");


//teacher main
router.get("/teacher", middlewareObj.isLoggedIn, (req, res)=>{
    res.render("teacher");
});

module.exports = router