const express                  = require("express"),
      router                   = express.Router({mergeParams: true}),
      middlewareObj            = require("../../middlewares/teacher/index");



const User                     = require("../../models/teacher/user")

router.get("/user/:user_id", middlewareObj.isLoggedIn, (req, res)=>{
    User.findById(req.params.user_id, (err, user)=>{
        if(err){
            console.log(err)
        }else{
            res.render("teacher/userProfile", {user: user});
        }
    })
})


router.get("/user/:user_id/settings", middlewareObj.isLoggedIn, (req, res)=>{
    User.findById(req.params.user_id, (err, user)=>{
        if(err){
            console.log(err)
        }else{
            res.render("teacher/settings/new", {user: user})
        }
    });
});

router.put("/user/:user_id/settings", middlewareObj.isLoggedIn, (req, res)=>{
    User.findByIdAndUpdate(req.params.user_id, req.body.userinf, (err, user)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/user/" + req.params.user_id)
            console.log(user)
        }
    })
})



module.exports = router