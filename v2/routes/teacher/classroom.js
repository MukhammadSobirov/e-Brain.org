const express                  = require("express"),
      router                   = express.Router({mergeParams: true});

let Category                   = require("../../models/lessonCategories");


//teacher classroom
//index
router.get("/teacher/classroom", (req, res)=>{
    Category.find({}, (err, foundCategory)=>{
        if(err){
            console.log(err)
        }else{
            res.render("classroom", {category: foundCategory});
        }
    }) ;
});

//new
router.get("/teacher/classroom/new", (req, res)=>{
    res.render("teacher/new")
})

//create
router.post("/teacher/classroom", (req, res)=>{
    let img         = req.body.category.img;
    let name        = req.body.category.name;
    let newCategory = {img: img, name: name};
    Category.create(newCategory, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/teacher/classroom")
        }
    });
});

//show route
router.get("/teacher/classroom/:id", (req, res)=>{
    Category.findById(req.params.id, (err, shownCategory)=>{
        if(err){
            console.log(err);
        }else{
            console.log(shownCategory);
            res.render("teacher/show", {category: shownCategory});
        }
    });
});

//edit
router.get("/teacher/classroom/:id/edit", (req, res)=>{
    Category.findById(req.params.id, (err, editCategory)=>{
        if(err){
            console.log(err);
        }else{
            res.render("teacher/edit", {category: editCategory});
        }
    });
});

//Update
router.put("/teacher/classroom/:id", (req, res)=>{
    Category.findByIdAndUpdate(req.params.id, req.body.category, (err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/teacher/classroom");
        }
    });
});

//destroy
router.delete("/teacher/classroom/:id", (req, res)=>{
    Category.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/teacher/classroom");
        }
    });
});



module.exports = router