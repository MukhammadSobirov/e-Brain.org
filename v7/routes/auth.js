const express                  = require("express"),
      passport                 = require("passport"),
      router                   = express.Router({mergeParams: true});

let User = require("../models/user");

//SIGNUP
router.get("/signup", (req, res)=>{
    res.render("signup")
});

router.post("/signup", (req, res)=>{
    let newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password, (err, username)=>{
        if(err){
            console.log(err);
            return res.render("signup")
        }
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/teacher")
        });
    });
});

//LOGIN
router.get("/login", (req, res)=>{
    res.render("login")
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
    res.redirect("/teacher")
});

module.exports = router;