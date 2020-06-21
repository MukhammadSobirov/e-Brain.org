const express                  = require("express"),
      router                   = express.Router({mergeParams: true}),
      middlewareObj            = require("../../middlewares/teacher/index");

let Category                   = require("../../models/teacher/lessonCategories");


//teacher classroom
//index
router.get("/teacher/classroom", middlewareObj.isLoggedIn, (req, res)=>{
    Category.find({}, (err, foundCategory)=>{
        if(err){
            console.log(err)
        }else{
            res.render("teacher/classroom", {category: foundCategory});
        }
    }) ;
});

//new
router.get("/teacher/classroom/new", middlewareObj.isLoggedIn, (req, res)=>{
    res.render("teacher/lessonCategory/new")
})

//create
router.post("/teacher/classroom", middlewareObj.isLoggedIn, (req, res)=>{
    let img         = req.body.category.img;
    let name        = req.body.category.name;
    let newCategory = {img: img, name: name};
    Category.create(newCategory, (err, category)=>{
        if(err){
            console.log(err);
        }else{
            category.author.id = req.user._id;
            category.author.username = req.user.username;
            category.save();
            res.redirect("/teacher/classroom")
            //console.log(category)
        }
    });
});

//show route
router.get("/teacher/classroom/:id", middlewareObj.isLoggedIn, (req, res)=>{
    Category.findById(req.params.id).populate("lesson").exec((err, shownCategory)=>{
        if(err){
            console.log(err);
        }else{
            console.log(shownCategory);
            res.render("teacher/lessonCategory/show", {category: shownCategory});
        }
    });
});

//edit
router.get("/teacher/classroom/:id/edit", middlewareObj.isLoggedIn, (req, res)=>{
    Category.findById(req.params.id, (err, editCategory)=>{
        if(err){
            console.log(err);
        }else{
            res.render("teacher/lessonCategory/edit", {category: editCategory});
        }
    });
});

//Update
router.put("/teacher/classroom/:id", middlewareObj.isLoggedIn, (req, res)=>{
    Category.findByIdAndUpdate(req.params.id, req.body.category, (err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/teacher/classroom");
        }
    });
});

//destroy
router.delete("/teacher/classroom/:id", middlewareObj.isLoggedIn, (req, res)=>{
    Category.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/teacher/classroom");
        }
    });
});



module.exports = router