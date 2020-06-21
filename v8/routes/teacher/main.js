const express                  = require("express"),
      router                   = express.Router({mergeParams: true}),
      middlewareObj            = require("../../middlewares/teacher/index");



const User                     = require("../../models/teacher/user")

//teacher main
router.get("/teacher", middlewareObj.isLoggedIn, (req, res)=>{
    User.find({}, (err, user)=>{
        if(err){
            console.log(err)
        }else{
            res.render("teacher/teacher", {user: user});
        }
    })
});



module.exports = router