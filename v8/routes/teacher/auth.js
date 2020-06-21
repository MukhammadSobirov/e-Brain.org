const express                  = require("express"),
      passport                 = require("passport"),
      router                   = express.Router({mergeParams: true});

let User = require("../../models/teacher/user");

//SIGNUP
router.get("/signup", (req, res)=>{
    res.render("teacher/signup")
});

router.post("/signup", (req, res)=>{
    let newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password, (err, username)=>{
        if(err){
            console.log(err);
            return res.render("teacher/signup")
        }
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/teacher")
        });
    });
});

//LOGIN
router.get("/login", (req, res)=>{
    res.render("teacher/login")
})

router.post("/login", passport.authenticate("local",
{
    successRedirect: "/teacher",
    failureRedirect: "/login"
}), (req, res)=>{
});

//LOGOUT
router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/login")
});

module.exports = router;